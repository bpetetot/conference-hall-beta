import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import isEmpty from 'lodash/isEmpty'

import eventsData from './events'

/**
 * Return the opening state of the cfp for the given eventId.
 * Values can be : not-started, opened, closed
 * @param {String} eventId event Id
 */
export const getCfpState = eventId => (state) => {
  const event = eventsData.get(eventId)(state) || {}
  if (event.type === 'meetup') {
    return event.cfpOpened ? 'opened' : 'closed'
  } else if (event.type === 'conference') {
    if (isEmpty(event.cfpDates)) return 'not-started'
    const { start, end } = event.cfpDates
    const today = new Date()
    if (isBefore(today, start)) return 'not-started'
    if (isAfter(today, end)) return 'closed'
    return 'opened'
  }
  return 'closed'
}

/**
 * Return true if CFP is opened
 * @param {string} eventId event id
 */
export const isCfpOpened = eventId => state => getCfpState(eventId)(state) === 'opened'

/**
 * Return the format
 * @param {string} eventId event id
 * @param {string} formatId format id
 */
export const getFormat = (eventId, formatId) => (state) => {
  const { formats } = eventsData.get(eventId)(state) || {}
  if (formats) {
    return formats.find(f => f.id === formatId)
  }
}

/**
 * Return the category
 * @param {string} eventId event id
 * @param {string} categoryId category id
 */
export const getCategory = (eventId, categoryId) => (state) => {
  const { categories } = eventsData.get(eventId)(state) || {}
  if (categories) {
    return categories.find(c => c.id === categoryId)
  }
}
