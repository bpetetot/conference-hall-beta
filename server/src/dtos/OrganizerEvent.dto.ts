import { Event, EventCategory, EventFormat, Prisma } from '@prisma/client'
import { isCfpFinished, isCfpOpened } from '../common/cfp-dates'
import { CategoryDto } from './Category.dto'
import { FormatDto } from './Format.dto'

export class OrganizerEventDto {
  id: number
  name: string
  description: string
  type: string
  visibility: string
  creatorId: number
  address?: string | null
  timezone?: string | null
  archived: boolean
  organizationId?: number | null
  conferenceStart?: Date | null
  conferenceEnd?: Date | null
  website?: string | null
  contact?: string | null
  cfpStart?: Date | null
  cfpEnd?: Date | null
  isCfpOpened: boolean
  isCfpFinished: boolean
  maxProposals?: number | null
  formatsRequired?: boolean | null
  categoriesRequired?: boolean | null
  formats?: FormatDto[] | null
  categories?: CategoryDto[] | null
  bannerUrl?: string | null
  deliberationEnabled: boolean
  displayOrganizersRatings: boolean
  displayProposalsRatings: boolean
  displayProposalsSpeakers: boolean
  surveyEnabled: boolean
  surveyQuestions?: Prisma.JsonValue | null
  emailOrganizer: string | null
  emailNotifications?: Prisma.JsonValue | null
  slackWebhookUrl?: string | null
  slackNotifications?: Prisma.JsonValue | null
  apiKey?: string | null

  constructor(event: Event & { formats?: EventFormat[]; categories?: EventCategory[] }) {
    this.id = event.id
    this.name = event.name
    this.description = event.description
    this.type = event.type
    this.visibility = event.visibility
    this.creatorId = event.creatorId
    this.address = event.address
    this.timezone = event.timezone
    this.archived = event.archived
    this.organizationId = event.organizationId
    this.conferenceStart = event.conferenceStart
    this.conferenceEnd = event.conferenceEnd
    this.website = event.website
    this.contact = event.contact
    this.cfpStart = event.cfpStart
    this.cfpEnd = event.cfpEnd
    this.maxProposals = event.maxProposals
    this.formatsRequired = event.formatsRequired
    this.categoriesRequired = event.categoriesRequired
    this.formats = event?.formats?.map((f) => new FormatDto(f))
    this.categories = event?.categories?.map((c) => new CategoryDto(c))
    this.bannerUrl = event.bannerUrl
    this.deliberationEnabled = event.deliberationEnabled
    this.displayOrganizersRatings = event.displayOrganizersRatings
    this.displayProposalsRatings = event.displayProposalsRatings
    this.displayProposalsSpeakers = event.displayProposalsSpeakers
    this.surveyEnabled = event.surveyEnabled
    this.surveyQuestions = event.surveyQuestions
    this.emailOrganizer = event.emailOrganizer
    this.emailNotifications = event.emailNotifications
    this.slackWebhookUrl = event.slackWebhookUrl
    this.slackNotifications = event.slackNotifications
    this.apiKey = event.apiKey
    this.isCfpOpened = isCfpOpened(event.type, event.cfpStart, event.cfpEnd)
    this.isCfpFinished = isCfpFinished(event.cfpEnd)
  }
}
