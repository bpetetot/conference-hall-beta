import { inject } from 'k-ramel/react'

import { getCfpState } from 'store/reducers/data/events.selector'
import CfpBlock from './cfpBlock'

const mapStore = (store, { eventId }) => {
  const { type, cfpDates, deliberationDate } = store.data.events.get(eventId)
  return {
    cfpState: getCfpState(eventId)(store),
    type,
    cfpDates,
    deliberationDate,
  }
}

export default inject(mapStore)(CfpBlock)
