import {
  EventCategory,
  EventFormat,
  Prisma,
  Proposal,
  ProposalStatus,
  Rating,
  User,
} from '@prisma/client'
import { Readable } from 'stream'
import { prisma } from './db'
import { isEmpty } from 'lodash'

export async function getProposal(proposalId: number) {
  return prisma.proposal.findUnique({
    where: { id: proposalId },
    include: {
      speakers: true,
      formats: true,
      categories: true,
      ratings: { include: { user: true } },
    },
  })
}

export async function getProposalForEvent(talkId: number, eventId: number) {
  return prisma.proposal.findUnique({
    where: {
      talkId_eventId: { talkId, eventId },
    },
  })
}

export async function findUserProposalsForEvent(eventId: number, userId: number) {
  return prisma.proposal.findMany({
    where: {
      eventId,
      speakers: { some: { id: userId } },
    },
  })
}

type ProposalCreateInput = Omit<Prisma.ProposalCreateInput, 'event'>

export async function createProposal(
  talkId: number,
  eventId: number,
  proposal: ProposalCreateInput,
) {
  return prisma.proposal.create({
    data: {
      ...proposal,
      talk: { connect: { id: talkId } },
      event: { connect: { id: eventId } },
    },
    include: { speakers: true, formats: true, categories: true },
  })
}

type ProposalUpdateInput = Prisma.ProposalUpdateInput

export async function updateProposal(proposalId: number, proposal: ProposalUpdateInput) {
  return prisma.proposal.update({
    where: { id: proposalId },
    data: proposal,
  })
}

export async function deleteProposal(proposalId: number) {
  return prisma.proposal.delete({ where: { id: proposalId } })
}

export type ProposalsPagination = {
  page?: number
  pageSize?: number
}

export type ProposalSort = 'newest' | 'oldest' | 'highestRating' | 'lowestRating'

export type ProposalsFilters = {
  search?: string
  isSpeakerSearchDisabled?: boolean
  ratings?: 'rated' | 'not-rated'
  status?: ProposalStatus
  format?: number
  category?: number
  sort?: string
  exceptItems?: number[]
  selectedItems?: number[]
}

export type ProposalsResults = {
  proposals: (Proposal & {
    speakers: User[]
    formats: EventFormat[]
    categories: EventCategory[]
    ratings: (Rating & { user: User })[]
  })[]
  total: number
  page: number
  pageSize: number
  pageCount: number | null
  nextPage: number | null
  previousPage: number | null
}

const DEFAULT_INDEX = 0
const DEFAULT_SIZE = 20

function buildSearchWhereClause(userId: number, eventId: number, filters: ProposalsFilters = {}) {
  const where: Prisma.ProposalWhereInput = { eventId }
  if (!isEmpty(filters.selectedItems)) {
    where.id = { in: filters.selectedItems }
    return where
  }
  if (!isEmpty(filters.exceptItems)) {
    where.id = { notIn: filters.exceptItems }
  }
  if (filters.search && filters.isSpeakerSearchDisabled) {
    where.title = { contains: filters.search, mode: 'insensitive' }
  } else if (filters.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { speakers: { some: { name: { contains: filters.search, mode: 'insensitive' } } } },
    ]
  }
  if (filters.ratings === 'rated') {
    where.ratings = { some: { userId } }
  } else if (filters.ratings === 'not-rated') {
    where.ratings = { none: { userId } }
  }
  if (filters.status) {
    where.status = filters.status
  }
  if (filters.format) {
    where.formats = { some: { id: filters.format } }
  }
  if (filters.category) {
    where.categories = { some: { id: filters.category } }
  }
  return where
}

function buildSearchOrderByClause(sort: ProposalSort) {
  const orderBy: Prisma.Enumerable<Prisma.ProposalOrderByWithRelationInput> = {}
  if (sort === 'highestRating') {
    orderBy.avgRateForSort = 'desc'
  } else if (sort === 'lowestRating') {
    orderBy.avgRateForSort = 'asc'
  } else if (sort === 'oldest') {
    orderBy.createdAt = 'asc'
  } else {
    orderBy.createdAt = 'desc'
  }
  return orderBy
}

export async function searchEventProposals(
  userId: number,
  eventId: number,
  filters: ProposalsFilters = {},
  sort: ProposalSort = 'newest',
  pagination: ProposalsPagination = {},
): Promise<ProposalsResults> {
  const where = buildSearchWhereClause(userId, eventId, filters)
  const orderBy = buildSearchOrderByClause(sort)

  const total = await prisma.proposal.count({ where })

  const { page = DEFAULT_INDEX, pageSize = DEFAULT_SIZE } = pagination
  if (pageSize <= 0) {
    throw new Error('Page size must be positive')
  }

  const pageCount = Math.ceil(total / pageSize)
  if (pageCount > 0 && (page < 0 || page >= pageCount)) {
    throw new Error('Invalid page index')
  }

  const proposals = await prisma.proposal.findMany({
    where,
    skip: page * pageSize,
    take: pageSize,
    include: {
      formats: true,
      categories: true,
      speakers: true,
      ratings: { include: { user: true } },
    },
    orderBy,
  })

  const nextPage = page + 1 < pageCount ? page + 1 : null
  const previousPage = page - 1 >= 0 ? page - 1 : null
  return { total, proposals, nextPage, previousPage, pageSize, page, pageCount }
}

export async function searchEventProposalsIds(
  userId: number,
  eventId: number,
  filters: ProposalsFilters = {},
  sort: ProposalSort = 'newest',
) {
  const where = buildSearchWhereClause(userId, eventId, filters)
  const orderBy = buildSearchOrderByClause(sort)

  const proposals = await prisma.proposal.findMany({
    select: { id: true },
    where,
    orderBy,
  })
  return proposals.map((proposal) => proposal.id)
}

export async function countReviewedProposals(
  userId: number,
  eventId: number,
  filters: ProposalsFilters = {},
) {
  if (filters.ratings === 'not-rated') {
    return 0
  }
  const where = buildSearchWhereClause(userId, eventId, {
    ...filters,
    ratings: 'rated',
  })
  return prisma.proposal.count({ where })
}

export function streamEventProposals(
  userId: number,
  eventId: number,
  filters: ProposalsFilters = {},
  options: { batchSize: number },
): Readable {
  const where = buildSearchWhereClause(userId, eventId, filters)

  let cursorId: number | undefined = undefined
  return new Readable({
    objectMode: true,
    async read() {
      try {
        const items = await prisma.proposal.findMany({
          where,
          take: options.batchSize,
          skip: cursorId ? 1 : 0,
          cursor: cursorId ? { id: cursorId } : undefined,
          include: {
            formats: true,
            categories: true,
            speakers: { include: { surveys: { where: { eventId } } } },
            ratings: true,
          },
        })
        for (const item of items) {
          this.push(item)
        }
        if (items.length < options.batchSize) {
          this.push(null)
        } else {
          cursorId = items[items.length - 1].id
        }
      } catch (error) {
        this.destroy(error)
      }
    },
  })
}

export async function updateEventProposals(
  userId: number,
  eventId: number,
  filters: ProposalsFilters = {},
  proposal: ProposalUpdateInput,
) {
  const where = buildSearchWhereClause(userId, eventId, filters)

  return prisma.proposal.updateMany({ where, data: proposal })
}
