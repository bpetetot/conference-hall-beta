import { firestore } from 'firebase-admin'
import { InviteType, Prisma, PrismaClient, Talk, User } from '@prisma/client'
import { mapLevels, timestampToDate } from './helpers'

export async function migrateUserTalks(prisma: PrismaClient, user: User) {
  const talksRef = await firestore().collection('talks').where('owner', '==', user.uid).get()

  const talks = await talksRef.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
  for (const talk of talks) {
    await createTalk(prisma, user, talk)
  }
}

async function createTalk(prisma: PrismaClient, user: User, talk: any) {
  const speakersIds = await findSpeakersIds(prisma, talk.speakers)

  const talkData: Prisma.TalkCreateInput = {
    uid: talk.uid,
    title: talk.title,
    abstract: talk.abstract,
    level: mapLevels(talk.level),
    languages: talk.language ? [talk.language] : undefined,
    references: talk.references,
    creator: { connect: { id: user.id } },
    speakers: { connect: speakersIds },
    archived: talk.archived,
    createdAt: timestampToDate(talk?.createTimestamp),
    updatedAt: timestampToDate(talk?.updateTimestamp),
  }

  const newTalk = await prisma.talk.create({ data: talkData })
  await createTalkInvite(prisma, talk.uid, newTalk)
}

async function findSpeakersIds(prisma: PrismaClient, speakers: { [uid: string]: boolean }) {
  const speakersUids = Object.entries(speakers)
    .filter(([uid, isSpeaker]) => isSpeaker)
    .map(([uid, _]) => uid)

  return prisma.user.findMany({
    select: { id: true },
    where: { uid: { in: speakersUids } },
  })
}

async function createTalkInvite(prisma: PrismaClient, talkUid: string, newTalk: Talk) {
  const invitesRef = await firestore()
    .collection('invites')
    .where('entity', '==', 'talk')
    .where('entityId', '==', talkUid)
    .get()

  const invites = await invitesRef.docs.map((doc) => ({ ...doc.data(), uid: doc.id }))
  if (invites.length <= 0) return
  const invite = invites[0] as any

  const inviteData: Prisma.InviteCreateInput = {
    uuid: invite.uid,
    type: InviteType.SPEAKER,
    entityId: newTalk.id,
    createdAt: timestampToDate(invite?.createTimestamp),
    updatedAt: timestampToDate(invite?.updateTimestamp),
    invitedBy: { connect: { id: newTalk.creatorId } },
    talk: { connect: { id: newTalk.id } },
  }

  await prisma.invite.create({ data: inviteData })
}
