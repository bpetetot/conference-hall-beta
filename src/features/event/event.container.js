import { inject } from '@k-ramel/react'
import { compose } from 'redux'

import loader from 'components/loader'
import Event from './event'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    ...event,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId }),
  }
}

export default compose(inject(mapStore), loader)(Event)
