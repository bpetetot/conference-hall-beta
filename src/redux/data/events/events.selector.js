import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import isEmpty from 'lodash/isEmpty'

import { getRouterParam } from 'redux/routes'
import eventsData from './events'

/**
 * Return the event id from the router params
 * @param {object} state the redux state
 */
export const getEventIdFromRouterParam = state => getRouterParam('eventId')(state)

/**
 * Return the event from the id in the router params
 * @param {object} state the redux state
 */
export const getEventFromRouterParam = (state) => {
  const id = getEventIdFromRouterParam(state)
  return eventsData.get(id)(state)
}

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
