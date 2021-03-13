import { prisma } from '../../src/db/db'

export async function buildSurvey(
  userId: number,
  eventId: number,
  answers: { [key: string]: string },
) {
  return prisma.survey.create({
    data: {
      event: { connect: { id: eventId } },
      user: { connect: { id: userId } },
      answers,
    },
  })
}
