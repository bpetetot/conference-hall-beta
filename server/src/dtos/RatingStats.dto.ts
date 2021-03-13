import { Rating, RatingFeeling } from '@prisma/client'
import { averageRatings, countFeelings } from '../common/ratings'

export class RatingStatsDto {
  count: number
  average: number | null
  loves: number
  hates: number
  noopinion: number

  constructor(ratings: Rating[]) {
    this.count = ratings.length
    this.average = averageRatings(ratings)
    this.loves = countFeelings(ratings, RatingFeeling.LOVE)
    this.hates = countFeelings(ratings, RatingFeeling.HATE)
    this.noopinion = countFeelings(ratings, RatingFeeling.NO_OPINION)
  }
}
