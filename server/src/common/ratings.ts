import { Rating, RatingFeeling } from '@prisma/client'
import { meanBy, max, min } from 'lodash'

export function averageRatings(ratings: Rating[]) {
  const ratingsForAvg = ratings.filter((r) => r.rating !== null)
  if (ratingsForAvg.length === 0) return 0
  return meanBy(ratingsForAvg, 'rating')
}

export function countFeelings(ratings: Rating[], feeling: RatingFeeling) {
  return ratings.filter((r) => r.feeling === feeling).length
}

export function checkRating(feeling?: RatingFeeling | null, rating?: number | null) {
  if (feeling === RatingFeeling.NO_OPINION) {
    return null
  } else if (feeling === RatingFeeling.POSITIVE) {
    return 5
  } else if (feeling === RatingFeeling.NEGATIVE) {
    return 0
  } else if (feeling === RatingFeeling.NEUTRAL) {
    return min([max([rating, 1]), 5])
  }
  return null
}
