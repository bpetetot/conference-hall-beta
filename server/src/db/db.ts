import { PrismaClient } from '@prisma/client'
import config from '../config'

export const prisma = new PrismaClient({
  // log: ['query']
})

export async function disconnect() {
  await prisma.$disconnect()
}

export async function resetTestDatabase() {
  if (config.ENV === 'test') {
    await prisma.betaKey.deleteMany()
    await prisma.survey.deleteMany()
    await prisma.message.deleteMany()
    await prisma.rating.deleteMany()
    await prisma.proposal.deleteMany()
    await prisma.talk.deleteMany()
    await prisma.eventFormat.deleteMany()
    await prisma.eventCategory.deleteMany()
    await prisma.event.deleteMany()
    await prisma.organizationMember.deleteMany()
    await prisma.organization.deleteMany()
    await prisma.user.deleteMany()
  }
}
