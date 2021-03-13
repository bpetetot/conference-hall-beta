import { Rating, RatingFeeling } from '@prisma/client'
import { meanBy, max, min } from 'lodash'

export function averageRatings(ratings: Rating[]) {
  const ratingsForAvg = ratings.filter((r) => r.rating !== null)
  return meanBy(ratingsForAvg, 'rating')
}

export function countFeelings(ratings: Rating[], feeling: RatingFeeling) {
  return ratings.filter((r) => r.feeling === feeling).length
}

export function checkRating(feeling?: RatingFeeling | null, rating?: number | null) {
  if (feeling === RatingFeeling.NO_OPINION) {
    return null
  } else if (feeling === RatingFeeling.LOVE) {
    return 5
  } else if (feeling === RatingFeeling.HATE) {
    return 0
  } else if (feeling === RatingFeeling.NEUTRAL) {
    return min([max([rating, 1]), 5])
  }
  return null
}
