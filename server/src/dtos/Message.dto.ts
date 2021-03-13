import { Message, User } from '@prisma/client'

export class MessageDto {
  id: number
  message: string
  name: string | null
  photoURL: string | null
  me: boolean
  createdAt: Date
  updatedAt: Date

  constructor(message: Message & { user: User }, authUser: User) {
    this.id = message.id
    this.message = message.message
    this.name = message.user.name
    this.photoURL = message.user.photoURL
    this.me = message.user.id === authUser.id
    this.createdAt = message.createdAt
    this.updatedAt = message.updatedAt
  }
}
