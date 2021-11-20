import { User } from '@prisma/client'

export class OrganizerSpeakerDto {
  id: number
  name: string | null
  photoURL: string | null
  email: string | null
  address: string | null
  twitter: string | null
  github: string | null
  references: string | null
  bio: string | null
  company: string | null

  constructor(speaker: User) {
    this.id = speaker.id
    this.name = speaker.name
    this.photoURL = speaker.photoURL
    this.email = speaker.email
    this.address = speaker.address
    this.twitter = speaker.twitter
    this.github = speaker.github
    this.references = speaker.references
    this.bio = speaker.bio
    this.company = speaker.company
  }
}
