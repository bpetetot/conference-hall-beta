import { User } from '@prisma/client'

export class ApiSpeakerDto {
  name: string | null
  photoURL: string | null
  language: string | null
  twitter: string | null
  github: string | null
  bio: string | null
  company: string | null

  constructor(speaker: User) {
    this.name = speaker.name
    this.photoURL = speaker.photoURL
    this.language = speaker.language
    this.twitter = speaker.twitter
    this.github = speaker.github
    this.bio = speaker.bio
    this.company = speaker.company
  }
}
