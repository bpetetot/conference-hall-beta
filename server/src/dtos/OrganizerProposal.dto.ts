import { Event, EventCategory, EventFormat, Proposal, Rating, User } from '@prisma/client'
import { CategoryDto } from './Category.dto'
import { FormatDto } from './Format.dto'
import { OrganizerSpeakerDto } from './OrganizerSpeaker.dto'
import { RatingDto } from './Rating.dto'
import { RatingStatsDto } from './RatingStats.dto'

export class OrganizerProposalDto {
  id: number
  status: string
  title: string
  abstract: string
  level?: string | null
  language?: string | null
  references?: string | null
  comments?: string | null
  emailStatus?: string | null
  speakerNotified: boolean
  formats?: FormatDto[]
  categories?: CategoryDto[]
  ratings?: RatingDto[]
  userRating?: RatingDto
  ratingStats?: RatingStatsDto
  speakers?: OrganizerSpeakerDto[]
  createdAt: Date
  messageCount?: number

  constructor(
    user: User,
    proposal: Proposal & {
      speakers: User[]
      formats: EventFormat[]
      categories: EventCategory[]
      ratings: (Rating & { user: User })[]
    },
    event: Event,
    messageCount?: number,
  ) {
    this.id = proposal.id
    this.title = proposal.title
    this.abstract = proposal.abstract
    this.level = proposal.level
    this.language = proposal.language
    this.references = proposal.references
    this.comments = proposal.comments
    this.formats = proposal.formats?.map((f) => new FormatDto(f))
    this.categories = proposal.categories?.map((c) => new CategoryDto(c))
    this.createdAt = proposal.createdAt
    this.userRating = new RatingDto(proposal.ratings.find((r) => r.userId === user.id))
    this.messageCount = messageCount

    this.status = proposal.status
    this.emailStatus = proposal.emailStatus
    this.speakerNotified = proposal.speakerNotified

    if (event.displayOrganizersRatings) {
      this.ratings = proposal.ratings?.map((r) => new RatingDto(r))
    }

    if (event.displayProposalsRatings) {
      this.ratingStats = new RatingStatsDto(proposal.ratings)
    }

    if (event.displayProposalsSpeakers) {
      this.speakers = proposal.speakers.map((s) => new OrganizerSpeakerDto(s))
    }
  }
}
