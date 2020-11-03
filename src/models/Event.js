import { toDate, toStartEndDates } from 'helpers/firebase'

export const EVENT_TYPES = { CONFERENCE: 'conference', MEETUP: 'meetup' }
export const VISIBILITY = { PUBLIC: 'conference', HIDDEN: 'meetup' }

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
