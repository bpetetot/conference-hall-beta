/* eslint-disable import/prefer-default-export */
import eventsData from 'redux/data/events'

import appData from './app'

export const getSpeakerAppEvent = (state) => {
  const { currentEventId } = appData.get()(state)
  return eventsData.get(currentEventId)(state) || {}
}
