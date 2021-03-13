import { User } from '@prisma/client'

export class SpeakerDto {
  id: number
  name: string | null
  photoURL: string | null

  constructor(speaker: User) {
    this.id = speaker.id
    this.name = speaker.name
    this.photoURL = speaker.photoURL
  }
}
