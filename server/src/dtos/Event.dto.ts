import { Event, EventCategory, EventFormat, Prisma } from '@prisma/client'
import { isCfpFinished, isCfpOpened } from '../common/cfp-dates'
import { CategoryDto } from './Category.dto'
import { FormatDto } from './Format.dto'

export class EventDto {
  id: number
  name: string
  description: string
  type: string
  address?: string | null
  timezone?: string | null
  conferenceStart?: Date | null
  conferenceEnd?: Date | null
  website?: string | null
  contact?: string | null
  cfpStart?: Date | null
  cfpEnd?: Date | null
  isCfpOpened: boolean
  isCfpFinished: boolean
  maxProposals?: number | null
  formatsRequired: boolean
  categoriesRequired: boolean
  surveyEnabled: boolean
  surveyQuestions?: Prisma.JsonValue | null
  bannerUrl?: string | null
  formats?: FormatDto[] | null
  categories?: CategoryDto[] | null

  constructor(event: Event & { formats?: EventFormat[]; categories?: EventCategory[] }) {
    this.id = event.id
    this.name = event.name
    this.description = event.description
    this.type = event.type
    this.address = event.address
    this.timezone = event.timezone
    this.conferenceStart = event.conferenceStart
    this.conferenceEnd = event.conferenceEnd
    this.website = event.website
    this.contact = event.contact
    this.cfpStart = event.cfpStart
    this.cfpEnd = event.cfpEnd
    this.maxProposals = event.maxProposals
    this.formatsRequired = event.formatsRequired
    this.categoriesRequired = event.categoriesRequired
    this.bannerUrl = event.bannerUrl
    this.surveyEnabled = event.surveyEnabled
    this.surveyQuestions = event.surveyQuestions
    this.isCfpOpened = isCfpOpened(event.type, event.cfpStart, event.cfpEnd)
    this.isCfpFinished = isCfpFinished(event.cfpEnd)
    this.formats = event?.formats?.map((f) => new FormatDto(f))
    this.categories = event?.categories?.map((c) => new CategoryDto(c))
  }
}
