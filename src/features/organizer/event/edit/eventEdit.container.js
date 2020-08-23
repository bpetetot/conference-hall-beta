import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import EventEdit from './eventEdit'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)
  return {
    loaded: !!event,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId }),
  }
}

export default compose(inject(mapStore), loader)(EventEdit)
