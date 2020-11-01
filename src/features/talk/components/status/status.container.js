import { inject } from '@k-ramel/react'

import { isCfpOpened } from 'store/reducers/data/events.selector'
import Status from './status'

const mapStore = (store, { eventId }) => ({
  loaded: !!store.data.events.get(eventId),
  cfpOpened: isCfpOpened(eventId)(store),
})

export default inject(mapStore)(Status)
