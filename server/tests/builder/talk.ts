import { User, Prisma, TalkLevel } from '@prisma/client'
import faker from 'faker'
import { prisma } from '../../src/db/db'

export async function buildTalk(
  user: User,
  talk?: Partial<Prisma.TalkCreateInput>,
  speakers: User[] = [],
) {
  const speakerIds = speakers.map((speaker) => ({ id: speaker.id }))
  speakerIds.push({ id: user.id })

  const data: Prisma.TalkCreateInput = {
    title: faker.lorem.sentence(),
    abstract: faker.lorem.paragraph(3),
    language: faker.random.locale(),
    level: faker.random.arrayElement([
      TalkLevel.BEGINNER,
      TalkLevel.INTERMEDIATE,
      TalkLevel.ADVANCED,
    ]),
    references: faker.lorem.paragraph(2),
    ownerId: user.id,
    speakers: { connect: speakerIds },
    ...(talk || {}),
  }

  return prisma.talk.create({ data, include: { speakers: true } })
}
