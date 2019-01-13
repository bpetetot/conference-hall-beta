import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import Events from './events'

const mapStore = (store, props, { router }) => ({
  loaded: store.ui.organizer.myEvents.isInitialized(),
  events: store.ui.organizer.myEvents.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZER_EVENTS'),
  onSelect: eventId => router.push('organizer-event-proposals', { eventId }),
})

export default compose(
  forRoute.absolute('organizer'), //
  inject(mapStore), //
  loader, //
)(Events)
