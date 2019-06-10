/* eslint-disable no-param-reassign,no-console */
const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')
const { get } = require('lodash')

const ALGOLIA_ID = functions.config().algolia.id
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY)

const dateToTimestamp = timestamp => Number.parseInt(timestamp.toDate().getTime() / 1000, 10)

const saveEvent = async (id, event) => {
  const record = {
    objectID: id,
    id,
    ...event,
    _geoloc: get(event, 'address.latLng'),
    updateTimestamp: dateToTimestamp(event.updateTimestamp),
    createTimestamp: dateToTimestamp(event.createTimestamp),
  }

  if (event.type === 'conference') {
    const start = get(event, 'conferenceDates.start')
    const end = get(event, 'conferenceDates.end')
    if (start && end) {
      event.conferenceDates.start = dateToTimestamp(start)
      event.conferenceDates.end = dateToTimestamp(end)
    }

    const cfpStart = get(event, 'cfpDates.start')
    const cfpEnd = get(event, 'cfpDates.end')
    if (cfpStart && cfpEnd) {
      event.cfpDates.start = dateToTimestamp(cfpStart)
      event.cfpDates.end = dateToTimestamp(cfpEnd)
    }
  }

  try {
    const index = client.initIndex(event.type)
    return await index.saveObject(record)
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

module.exports = saveEvent
