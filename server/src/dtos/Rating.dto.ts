import { Rating } from '@prisma/client'

export class RatingDto {
  userId?: number
  rating?: number | null
  feeling?: string

  constructor(rating?: Rating) {
    this.userId = rating?.userId
    this.rating = rating?.rating
    this.feeling = rating?.feeling
  }
}
