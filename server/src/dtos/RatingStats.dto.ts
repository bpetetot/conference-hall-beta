import { Rating, RatingFeeling } from '@prisma/client'
import { averageRatings, countFeelings } from '../common/ratings'

export class RatingStatsDto {
  count: number
  average: number | null
  positives: number
  negatives: number
  noopinion: number

  constructor(ratings: Rating[]) {
    this.count = ratings.length
    this.average = averageRatings(ratings)
    this.positives = countFeelings(ratings, RatingFeeling.POSITIVE)
    this.negatives = countFeelings(ratings, RatingFeeling.NEGATIVE)
    this.noopinion = countFeelings(ratings, RatingFeeling.NO_OPINION)
  }
}
