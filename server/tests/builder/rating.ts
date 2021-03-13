import { RatingFeeling } from '@prisma/client'
import { prisma } from '../../src/db/db'

export async function buildRating(
  userId: number,
  proposalId: number,
  rating: number | null,
  feeling: RatingFeeling,
) {
  return prisma.rating.create({
    data: {
      user: { connect: { id: userId } },
      proposal: { connect: { id: proposalId } },
      rating,
      feeling,
    },
  })
}
