import { Request, Response } from 'express'
import { isNil } from 'lodash'
import { EmailStatus, MessageChannel, OrganizationRole, ProposalStatus, User } from '@prisma/client'
import { HttpException } from '../middleware/error'
import * as eventsRepository from '../db/events.repository'
import * as proposalsRepository from '../db/proposals.repository'
import * as surveysRepository from '../db/surveys.repository'
import * as ratingsRepository from '../db/ratings.repository'
import * as messagesRepository from '../db/messages.repository'
import * as emailServices from '../emails/email.services'
import { checkUser } from '../users/users.controller'
import { checkUserRole } from './organizations.controller'
import { OrganizerEventDto } from '../dtos/OrganizerEvent.dto'
import { OrganizerProposalsResult } from '../dtos/OrganizerProposalsResult.dto'
import { OrganizerSpeakerSurveyDto } from '../dtos/OrganizerSpeakerSurvey.dto'
import { checkRating } from '../common/ratings'
import { ExportProposalDto } from '../dtos/ExportProposal.dto'
import { MessageDto } from '../dtos/Message.dto'
import { OrganizerProposalDto } from '../dtos/OrganizerProposal.dto'

async function checkEvent(
  user: User,
  eventId: number,
  options?: eventsRepository.GetOrganizerEventOptions,
) {
  const event = await eventsRepository.getOrganizerEventById(eventId, user.id, options)
  if (!event) {
    throw new HttpException(403, 'No sufficient permissions')
  }
  return event
}

async function checkEventAndRoles(user: User, eventId: number, roles: OrganizationRole[]) {
  const event = await checkEvent(user, eventId)
  if (event.organizationId) {
    await checkUserRole(user, event.organizationId, roles)
  }
  return event
}

export async function findUserEvents(req: Request) {
  const user = await checkUser(req.user.uid)
  const events = await eventsRepository.findOrganizerEvents(user.id)
  return events.map((event) => new OrganizerEventDto(event))
}

export async function createEvent(req: Request) {
  const user = await checkUser(req.user.uid)
  const { organizationId, ...eventData } = req.body
  let event = await eventsRepository.createEvent(user.id, eventData)
  if (organizationId) {
    await checkUserRole(user, organizationId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])
    event = await eventsRepository.addEventToOrganization(event.id, organizationId)
  }
  return new OrganizerEventDto(event)
}

export async function findUserEvent(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEvent(user, eventId, { withFormatsCategories: true })
  return new OrganizerEventDto(event)
}

export async function updateEvent(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])
  await eventsRepository.updateEvent(event.id, req.body)
}

export async function addEventFormat(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])
  return eventsRepository.addFormat(event.id, req.body)
}

export async function updateEventFormat(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  await checkEventAndRoles(user, eventId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])
  const formatId = parseInt(req.params.formatId)
  await eventsRepository.updateFormat(formatId, req.body)
}

export async function removeEventFormat(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  await checkEventAndRoles(user, eventId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])
  const formatId = parseInt(req.params.formatId)
  await eventsRepository.deleteFormat(formatId)
}

export async function addEventCategory(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])
  return eventsRepository.addCategory(event.id, req.body)
}

export async function updateEventCategory(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  await checkEventAndRoles(user, eventId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])
  const categoryId = parseInt(req.params.categoryId)
  await eventsRepository.updateCategory(categoryId, req.body)
}

export async function removeEventCategory(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  await checkEventAndRoles(user, eventId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])
  const categoryId = parseInt(req.params.categoryId)
  await eventsRepository.deleteCategory(categoryId)
}

export async function getProposal(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const proposalId = parseInt(req.params.proposalId)
  const user = await checkUser(req.user.uid)
  const event = await checkEvent(user, eventId)

  const proposal = await proposalsRepository.getProposal(proposalId)
  if (!proposal) {
    throw new HttpException(404, 'Proposal not found')
  }

  const messageCount = await messagesRepository.countProposalMessages(
    proposalId,
    MessageChannel.ORGANIZER,
  )

  return new OrganizerProposalDto(user, proposal, event, messageCount)
}

export async function searchProposals(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEvent(user, eventId)

  const filters: proposalsRepository.ProposalsFilters = {
    search: req.query.search as string,
    isSpeakerSearchDisabled: !event.displayProposalsSpeakers,
    ratings: req.query.ratings as 'rated' | 'not-rated',
    status: req.query.status as ProposalStatus,
    format: (req.query.format as unknown) as number,
    category: (req.query.category as unknown) as number,
  }

  const sort = req.query.sort as proposalsRepository.ProposalSort

  const pagination: proposalsRepository.ProposalsPagination = {
    page: (req.query.page as unknown) as number,
    pageSize: (req.query.pageSize as unknown) as number,
  }

  const result = await proposalsRepository.searchEventProposals(
    user.id,
    event.id,
    filters,
    sort,
    pagination,
  )

  const totalRated = await proposalsRepository.countReviewedProposals(user.id, event.id, filters)

  return new OrganizerProposalsResult(user, event, result, totalRated)
}

export async function searchProposalsIds(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEvent(user, eventId)

  const filters: proposalsRepository.ProposalsFilters = {
    search: req.query.search as string,
    isSpeakerSearchDisabled: !event.displayProposalsSpeakers,
    ratings: req.query.ratings as 'rated' | 'not-rated',
    status: req.query.status as ProposalStatus,
    format: (req.query.format as unknown) as number,
    category: (req.query.category as unknown) as number,
  }

  const sort = req.query.sort as proposalsRepository.ProposalSort

  return proposalsRepository.searchEventProposalsIds(user.id, event.id, filters, sort)
}

export async function batchUpdateProposals(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])

  const filters: proposalsRepository.ProposalsFilters = {
    search: req.body.filters.search as string,
    ratings: req.body.filters.ratings as 'rated' | 'not-rated',
    status: req.body.filters.status as ProposalStatus,
    format: req.body.filters.format as number,
    category: req.body.filters.category as number,
    exceptItems: req.body.filters.exceptItems as number[],
    selectedItems: req.body.filters.selectedItems as number[],
  }

  const status: ProposalStatus = req.body.data.status

  await proposalsRepository.updateEventProposals(user.id, event.id, filters, { status })
}

export async function exportProposals(req: Request, res: Response) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])

  const filters: proposalsRepository.ProposalsFilters = {
    search: req.body.search as string,
    ratings: req.body.ratings as 'rated' | 'not-rated',
    status: req.body.status as ProposalStatus,
    format: req.body.format as number,
    category: req.body.category as number,
    exceptItems: req.body.exceptItems as number[],
    selectedItems: req.body.selectedItems as number[],
  }

  const proposalsStream = proposalsRepository.streamEventProposals(user.id, event.id, filters, {
    batchSize: 20,
  })

  let count = 0
  res.write('[')
  for await (const proposal of proposalsStream) {
    if (count > 0) res.write(',')
    const exported = new ExportProposalDto(proposal)
    res.write(JSON.stringify(exported))
    count++
  }
  res.write(']')
  res.end()
}

export async function sendProposalsEmails(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEventAndRoles(user, eventId, [
    OrganizationRole.MEMBER,
    OrganizationRole.OWNER,
  ])

  const filters: proposalsRepository.ProposalsFilters = {
    search: req.body.search as string,
    ratings: req.body.ratings as 'rated' | 'not-rated',
    status: req.body.status as ProposalStatus,
    format: req.body.format as number,
    category: req.body.category as number,
    exceptItems: req.body.exceptItems as number[],
    selectedItems: req.body.selectedItems as number[],
  }

  await emailServices.sendProposalsDeliberationEmails(user.id, event, filters)

  await proposalsRepository.updateEventProposals(user.id, event.id, filters, {
    emailStatus: EmailStatus.SENT,
    speakerNotified: true,
  })
}

export async function updateProposal(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const proposalId = parseInt(req.params.proposalId)
  const user = await checkUser(req.user.uid)
  await checkEventAndRoles(user, eventId, [OrganizationRole.MEMBER, OrganizationRole.OWNER])

  const { title, abstract, language, level, status, formats, categories } = req.body

  let formatsToSave, categoriesToSave
  if (formats && formats.length > 0) {
    formatsToSave = {
      set: [],
      connect: formats?.filter(Boolean).map((id: number) => ({ id })),
    }
  }
  if (categories && categories.length > 0) {
    categoriesToSave = {
      set: [],
      connect: categories?.filter(Boolean).map((id: number) => ({ id })),
    }
  }

  await proposalsRepository.updateProposal(proposalId, {
    title,
    abstract,
    language,
    level,
    status,
    formats: formatsToSave,
    categories: categoriesToSave,
  })
}

export async function rateProposal(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  await checkEvent(user, eventId)

  const feeling = req.body.feeling
  const rating = checkRating(feeling, req.body.rating)
  const proposalId = parseInt(req.params.proposalId)
  if (isNil(rating) && isNil(feeling)) {
    await ratingsRepository.deleteRating(user.id, proposalId)
  } else {
    await ratingsRepository.saveRating(user.id, proposalId, { rating, feeling })
  }
}

export async function getSpeakerSurvey(req: Request) {
  const eventId = parseInt(req.params.eventId)
  const user = await checkUser(req.user.uid)
  const event = await checkEvent(user, eventId)
  if (!event.surveyEnabled || !event.displayProposalsSpeakers) {
    throw new HttpException(403, 'Surveys not available for the event or speaker')
  }
  const speakerId = parseInt(req.params.speakerId)

  const survey = await surveysRepository.getEventSurveyForUser(eventId, speakerId)
  return new OrganizerSpeakerSurveyDto(survey)
}

export async function findProposalMessages(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  await checkEvent(user, eventId)
  const proposalId = parseInt(req.params.proposalId)
  const messages = await messagesRepository.findProposalMessages(
    proposalId,
    MessageChannel.ORGANIZER,
  )
  return messages.map((message) => new MessageDto(message, user))
}

export async function createProposalMessage(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  await checkEvent(user, eventId)
  const proposalId = parseInt(req.params.proposalId)
  const message = await messagesRepository.addMessage(
    user.id,
    proposalId,
    MessageChannel.ORGANIZER,
    req.body.message,
  )
  return new MessageDto(message, user)
}

export async function updateProposalMessage(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  await checkEvent(user, eventId)
  const messageId = parseInt(req.params.messageId)
  const result = await messagesRepository.updateMessage(messageId, user.id, req.body.message)
  if (result.count === 0) {
    throw new HttpException(404, 'Message not found')
  }
}

export async function deleteProposalMessage(req: Request) {
  const user = await checkUser(req.user.uid)
  const eventId = parseInt(req.params.eventId)
  await checkEvent(user, eventId)
  const messageId = parseInt(req.params.messageId)
  const result = await messagesRepository.deleteMessage(messageId, user.id)
  if (result.count === 0) {
    throw new HttpException(404, 'Message not found')
  }
}
