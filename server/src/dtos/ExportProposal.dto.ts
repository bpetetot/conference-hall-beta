import { EventCategory, EventFormat, Proposal, Rating, Survey, User } from '@prisma/client'
import { CategoryDto } from './Category.dto'
import { ExportSpeakerDto } from './ExportSpeaker.dto'
import { FormatDto } from './Format.dto'
import { RatingDto } from './Rating.dto'
import { RatingStatsDto } from './RatingStats.dto'

export class ExportProposalDto {
  id: number
  status: string
  title: string
  abstract: string
  level?: string | null
  languages?: string[] | null
  references?: string | null
  comments?: string | null
  formats?: FormatDto[]
  categories?: CategoryDto[]
  userRating?: RatingDto
  ratingStats: RatingStatsDto
  speakers: ExportSpeakerDto[]
  createdAt: Date

  constructor(
    proposal: Proposal & {
      speakers: (User & { surveys: Survey[] })[]
      formats: EventFormat[]
      categories: EventCategory[]
      ratings: Rating[]
    },
  ) {
    this.id = proposal.id
    this.status = proposal.status
    this.title = proposal.title
    this.abstract = proposal.abstract
    this.level = proposal.level
    this.languages = proposal.languages as string[] | null
    this.references = proposal.references
    this.comments = proposal.comments
    this.formats = proposal.formats?.map((f) => new FormatDto(f))
    this.categories = proposal.categories?.map((c) => new CategoryDto(c))
    this.speakers = proposal.speakers.map((s) => new ExportSpeakerDto(s))
    this.ratingStats = new RatingStatsDto(proposal.ratings)
    this.createdAt = proposal.createdAt
  }
}
