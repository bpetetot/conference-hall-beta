import { DateTime } from 'luxon'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { toDate, toStartEndDates } from 'helpers/firebase'

export const EVENT_TYPES = { CONFERENCE: 'conference', MEETUP: 'meetup' }
export const VISIBILITY = { PUBLIC: 'public', HIDDEN: 'hidden' }

class Event {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.conferenceDates = data.conferenceDates
    this.type = data.type
    this.visibility = data.visibility
    this.address = data.address
    this.contact = data.contact
    this.website = data.website
    this.bannerUrl = data.bannerUrl
    this.cfpDates = data.cfpDates
    this.cfpOpened = data.cfpOpened
    this.deliberationDate = data.deliberationDate
    this.categories = data.categories
    this.formats = data.formats
    this.mandatoryFields = data.mandatoryFields
    this.maxProposals = data.maxProposals
    this.survey = data.survey
    this.surveyActive = data.surveyActive
    this.organization = data.organization
    this.owner = data.owner
    this.updateTimestamp = data.updateTimestamp
    this.createTimestamp = data.createTimestamp
  }

  isConference() {
    return this.type === EVENT_TYPES.CONFERENCE
  }

  isMeetup() {
    return this.type === EVENT_TYPES.MEETUP
  }

  isCfpOpened() {
    return this.getCfpState() === 'opened'
  }

  getCfpState(userTimezone = 'local') {
    if (this.type === 'meetup') {
      return this.cfpOpened ? 'opened' : 'closed'
    }

    if (isEmpty(this.cfpDates)) {
      return 'not-started'
    }

    // By default 'Europe/Paris' because now it should be mandatory
    const eventTimezone = get(this.address, 'timezone.id', 'Europe/Paris')

    const { start, end } = this.getCfpOpeningDates(eventTimezone)
    const today = DateTime.utc().setZone(userTimezone)
    if (today < start) {
      return 'not-started'
    }
    if (today > end) {
      return 'closed'
    }
    return 'opened'
  }

  getCfpOpeningDates(eventTimezone) {
    if (isEmpty(this.cfpDates)) return null

    const { start, end } = this.cfpDates
    return {
      start: DateTime.fromJSDate(start).setZone(eventTimezone),
      end: DateTime.fromJSDate(end).setZone(eventTimezone).plus({
        hours: 23,
        minutes: 59,
        seconds: 59,
      }),
    }
  }
}

export const eventConverter = {
  toFirestore(event) {
    return { ...event }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new Event({
      id: snapshot.id,
      ...data,
      conferenceDates: toStartEndDates(data.conferenceDates),
      cfpDates: toStartEndDates(data.cfpDates),
      deliberationDate: toDate(data.deliberationDate),
      updateTimestamp: toDate(data.updateTimestamp),
      createTimestamp: toDate(data.createTimestamp),
    })
  },
}

export default Event
