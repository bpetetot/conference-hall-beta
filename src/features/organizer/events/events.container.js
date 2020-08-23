import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import Events from './events'

const mapStore = (store, { userId }) => ({
  loaded: store.ui.organizer.myEvents.isInitialized(),
  events: store.ui.organizer.myEvents.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZER_EVENTS', payload: { userId } }),
  onSelect: (eventId) => {
    store.dispatch({ type: '@@ui/ON_ORGANIZER_CHANGE_EVENT', payload: { eventId } })
  },
})

export default compose(inject(mapStore), loader)(Events)
