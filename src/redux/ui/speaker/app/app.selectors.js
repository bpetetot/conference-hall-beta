/* eslint-disable import/prefer-default-export */
import eventsData from 'redux/data/events'

import appData from './app'

export const getSpeakerAppEvent = () => {
  const { currentEventId } = appData.get()
  return eventsData.get(currentEventId) || {}
}
