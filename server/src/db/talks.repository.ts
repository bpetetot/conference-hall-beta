import { Prisma } from '@prisma/client'
import { prisma } from './db'

type GetTalkOptions = {
  withSpeakers?: boolean
  withProposals?: boolean
}

export async function getTalk(id: number, options?: GetTalkOptions) {
  let proposals: boolean | Prisma.ProposalFindManyArgs = false
  if (options?.withProposals) {
    proposals = {
      include: { formats: true, categories: true },
    }
  }

  return prisma.talk.findUnique({
    where: { id },
    include: {
      speakers: options?.withSpeakers || false,
      proposals,
    },
  })
}

export async function findUserTalks(uid: string) {
  return prisma.talk.findMany({
    where: {
      speakers: { some: { uid: { equals: uid } } },
    },
    include: { speakers: true, proposals: true },
  })
}

type TalkCreateInput = Omit<Prisma.TalkCreateInput, 'ownerId'>

export async function createTalk(userId: number, talk: TalkCreateInput) {
  return prisma.talk.create({
    data: {
      ...talk,
      ownerId: userId,
      speakers: { connect: [{ id: userId }] },
    },
    include: { speakers: true },
  })
}

type TalkUpdateInput = Prisma.TalkUpdateInput

export async function updateTalk(talkId: number, talk: TalkUpdateInput) {
  return prisma.talk.update({
    data: talk,
    where: { id: talkId },
  })
}

export async function deleteTalk(talkId: number) {
  return prisma.talk.delete({ where: { id: talkId } })
}
