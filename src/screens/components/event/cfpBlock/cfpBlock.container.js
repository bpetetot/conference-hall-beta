import { inject } from 'k-ramel/react'

import eventsData, { getCfpState } from 'redux/data/events'
import CfpBlock from './cfpBlock'

const mapStore = (store, { eventId }) => {
  const { type, cfpDates, deliberationDate } = eventsData.get(eventId)(store.getState())
  return {
    cfpState: getCfpState(eventId)(store.getState()),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default inject(mapStore)(CfpBlock)
