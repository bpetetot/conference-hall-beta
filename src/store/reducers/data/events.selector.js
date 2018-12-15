import isEmpty from 'lodash/isEmpty'
import startOfDay from 'date-fns/start_of_day'
import endOfDay from 'date-fns/end_of_day'
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import { toDate } from 'helpers/firebase'

/**
 * Compute if the state of the CFP according timezones.
 * TODO: CODE DUPLICATED in cloud function (share it when monorepo)
 * @param {*} event Event
 */
export const getEventCfpState = (event) => {
  if (event.type === 'meetup') {
    return event.cfpOpened ? 'opened' : 'closed'
  }

  const { cfpDates } = event
  if (isEmpty(cfpDates)) {
    return 'not-started'
  }

  const start = startOfDay(toDate(cfpDates.start)) // is it UTC to Local date ????
  const end = endOfDay(toDate(cfpDates.end)) // is it UTC to Local date ????
  const today = new Date()

  if (isBefore(today, start)) {
    return 'not-started'
  }
  if (isAfter(today, end)) {
    return 'closed'
  }
  return 'opened'
}

/**
 * Return the opening state of the cfp for the given eventId.
 * Values can be : not-started, opened, closed
 * @param {String} eventId event Id
 */
export const getCfpState = eventId => (store) => {
  const event = store.data.events.get(eventId) || {}
  return getEventCfpState(event)
}

/**
 * Return true if CFP is opened
 * @param {string} eventId event id
 */
export const isCfpOpened = eventId => store => getCfpState(eventId)(store) === 'opened'

/**
 * Return the format
 * @param {string} eventId event id
 * @param {string} formatId format id
 */
export const getFormat = (eventId, formatId) => (store) => {
  const { formats } = store.data.events.get(eventId) || {}
  if (formats) {
    return formats.find(f => f.id === formatId)
  }
  return undefined
}

/**
 * Return the category
 * @param {string} eventId event id
 * @param {string} categoryId category id
 */
export const getCategory = (eventId, categoryId) => (store) => {
  const { categories } = store.data.events.get(eventId) || {}
  if (categories) {
    return categories.find(c => c.id === categoryId)
  }
  return undefined
}
