import { inject } from 'k-ramel/react'

import { getCfpState } from 'redux/data/events'
import CfpBlock from './cfpBlock'

const mapStore = (store, { eventId }) => {
  const { type, cfpDates, deliberationDate } = store.data.events.get(eventId)
  return {
    cfpState: getCfpState(eventId)(store.getState()),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default inject(mapStore)(CfpBlock)
