import faker from 'faker'
import { Prisma, Talk, User } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildProposal(
  eventId: number,
  talk: Talk & { speakers: User[] },
  proposal?: Partial<Prisma.ProposalCreateInput>,
) {
  const data: Prisma.ProposalCreateInput = {
    title: proposal?.title || talk.title,
    abstract: proposal?.abstract || talk.abstract,
    level: proposal?.level || talk.level,
    language: proposal?.language || talk.language,
    references: proposal?.references || talk.references,
    comments: faker.lorem.paragraph(1),
    event: { connect: { id: eventId } },
    talk: { connect: { id: talk.id } },
    speakers: { connect: talk.speakers.map((u) => ({ id: u.id })) },
    ...(proposal || {}),
  }

  return prisma.proposal.create({ data })
}
