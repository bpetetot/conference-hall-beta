/* eslint-disable import/prefer-default-export */
import isAfter from 'date-fns/is_after'
import isBefore from 'date-fns/is_before'
import isEmpty from 'lodash/isEmpty'

import eventFactory from './event'

/**
 * Return the current opening state of the cfp.
 * Values can be : not-started, opened, closed
 * @param {Object} state current state of the store
 */
export const getCfpState = (state) => {
  const event = eventFactory.get()(state)
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
