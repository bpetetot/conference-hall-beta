import { EventCategory, EventFormat, Proposal, ProposalStatus } from '@prisma/client'
import { CategoryDto } from './Category.dto'
import { FormatDto } from './Format.dto'

export class SpeakerProposalDto {
  eventId: number
  talkId: number | null
  status: string
  title: string
  abstract: string
  level?: string | null
  language?: string | null
  references?: string | null
  comments?: string | null
  formats?: FormatDto[]
  categories?: CategoryDto[]
  createdAt: Date

  constructor(proposal: Proposal & { formats?: EventFormat[]; categories?: EventCategory[] }) {
    this.eventId = proposal.eventId
    this.talkId = proposal.talkId
    this.title = proposal.title
    this.abstract = proposal.abstract
    this.level = proposal.level
    this.language = proposal.language
    this.references = proposal.references
    this.status = proposal.speakerNotified ? proposal.status : ProposalStatus.SUBMITTED
    this.formats = proposal.formats?.map((f) => new FormatDto(f))
    this.categories = proposal.categories?.map((c) => new CategoryDto(c))
    this.comments = proposal.comments
    this.createdAt = proposal.createdAt
  }
}
