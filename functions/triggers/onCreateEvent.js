/* eslint-disable no-console */
const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')
const { get } = require('lodash')

const ALGOLIA_ID = functions.config().algolia.id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

// onCreateProposal is called when an event is created
// it will index the event in Algolia
module.exports = functions.firestore
  .document('events/{eventId}')
  .onCreate(async (snap, context) => {
    const { eventId } = context.params
    const event = snap.data()

    const record = {
      objectID: eventId,
      name: event.name,
      description: event.description,
      type: event.type,
      website: event.website,
      contact: event.contact,
      visibility: event.visibility,
      logo: event.logo,
      image: event.image,
      country: get(event, 'address.country'),
      locality: get(event, 'address.locality'),
      geo_location: get(event, 'address.latLng'),
      create_timestamp: event.createTimestamp,
    }

    if (event.type === 'conference') {
      record.conference_start = get(event, 'conferenceDates.start')
      record.conference_end = get(event, 'conferenceDates.end')
      record.cfp_start = get(event, 'cfpDates.start')
      record.cfp_end = get(event, 'cfpDates.end')
    }

    if (event.type === 'meetup') {
      record.cfp_opened = event.cfpOpened
    }

    const index = client.initIndex(event.type)
    index.saveObject(record).catch(err => console.error(err))
  })
