import { Prisma } from '@prisma/client'
import { prisma } from './db'

export async function getEventSurveyForUser(eventId: number, userId: number) {
  return prisma.survey.findUnique({ where: { userId_eventId: { eventId, userId } } })
}

export async function saveEventSurveyForUser(
  eventId: number,
  userId: number,
  answers: Prisma.InputJsonValue,
) {
  return prisma.survey.upsert({
    where: { userId_eventId: { eventId, userId } },
    update: { answers },
    create: {
      event: { connect: { id: eventId } },
      user: { connect: { id: userId } },
      answers,
    },
  })
}
