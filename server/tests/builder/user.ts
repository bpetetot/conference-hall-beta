import faker from 'faker'
import { Prisma } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildUser(user?: Partial<Prisma.UserCreateInput>) {
  const name = user?.name || faker.name.findName()

  const data: Prisma.UserCreateInput = {
    uid: faker.datatype.uuid(),
    name,
    email: faker.internet.email(name),
    bio: faker.lorem.paragraph(3),
    address: faker.address.city(),
    company: faker.company.companyName(),
    photoURL: faker.image.animals(200, 200),
    references: faker.lorem.paragraph(2),
    github: faker.internet.userName(name),
    twitter: faker.internet.userName(name),
    language: faker.random.locale(),
    timezone: faker.address.timeZone(),
    ...(user || {}),
  }

  return prisma.user.create({ data })
}
