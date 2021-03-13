import { User } from '@prisma/client'

export class SearchUserDto {
  id: number
  name: string | null
  photoURL: string | null

  constructor(user: User) {
    this.id = user.id
    this.name = user.name
    this.photoURL = user.photoURL
  }
}
