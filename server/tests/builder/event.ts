import faker from 'faker'
import { Prisma, User } from '@prisma/client'
import { prisma } from '../../src/db/db'
import { buildUser } from './user'

export async function buildEvent(user?: User | null, event?: Partial<Prisma.EventCreateInput>) {
  if (!user) {
    user = await buildUser()
  }

  const data: Prisma.EventCreateInput = {
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(4),
    address: faker.address.streetAddress(),
    contact: faker.internet.exampleEmail(),
    website: faker.internet.url(),
    bannerUrl: faker.image.abstract(),
    type: 'CONFERENCE',
    visibility: 'PUBLIC',
    ownerId: user.id,
    ...(event || {}),
  }

  return prisma.event.create({ data })
}

export async function buildFormat(eventId: number) {
  return prisma.eventFormat.create({
    data: {
      event: { connect: { id: eventId } },
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    },
  })
}

export async function buildCategory(eventId: number) {
  return prisma.eventCategory.create({
    data: {
      event: { connect: { id: eventId } },
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    },
  })
}
