import { EventCategory, EventFormat, Proposal, User } from '@prisma/client'
import { CategoryDto } from '../../dtos/Category.dto'
import { FormatDto } from '../../dtos/Format.dto'
import { ApiSpeakerDto } from './ApiSpeaker.dto'

export class ApiProposalDto {
  title: string
  abstract: string
  level?: string | null
  languages?: string[] | null
  formats?: FormatDto[]
  categories?: CategoryDto[]
  speakers: ApiSpeakerDto[]
  createdAt: Date

  constructor(
    proposal: Proposal & {
      speakers: User[]
      formats: EventFormat[]
      categories: EventCategory[]
    },
  ) {
    this.title = proposal.title
    this.abstract = proposal.abstract
    this.level = proposal.level
    this.languages = proposal.languages as string[] | null
    this.formats = proposal.formats?.map((f) => new FormatDto(f))
    this.categories = proposal.categories?.map((c) => new CategoryDto(c))
    this.speakers = proposal.speakers.map((s) => new ApiSpeakerDto(s))
    this.createdAt = proposal.createdAt
  }
}
