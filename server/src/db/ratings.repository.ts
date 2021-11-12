import { RatingFeeling } from '@prisma/client'
import { prisma } from './db'

type RatingInput = {
  rating?: number | null
  feeling: RatingFeeling
}

export async function saveRating(userId: number, proposalId: number, data: RatingInput) {
  return prisma.rating.upsert({
    where: {
      userId_proposalId: { userId, proposalId },
    },
    update: data,
    create: {
      user: { connect: { id: userId } },
      proposal: { connect: { id: proposalId } },
      ...data,
    },
  })
}

export async function deleteRating(userId: number, proposalId: number) {
  return prisma.rating.deleteMany({ where: { userId, proposalId } })
}

export async function getAverageRatings(proposalId: number) {
  const result = await prisma.rating.aggregate({ _avg: { rating: true }, where: { proposalId } })
  return result._avg.rating || 0
}
