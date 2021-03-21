import { Rating, User } from '@prisma/client'

export class RatingDto {
  userId?: number
  userName?: string | null
  userPhotoURL?: string | null
  rating?: number | null
  feeling?: string

  constructor(rating?: Rating & { user: User }) {
    this.userId = rating?.userId
    this.userName = rating?.user.name
    this.userPhotoURL = rating?.user.photoURL
    this.rating = rating?.rating
    this.feeling = rating?.feeling
  }
}
