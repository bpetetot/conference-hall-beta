import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import Events from './events'

const mapStore = (store, props, { router }) => ({
  loaded: store.ui.organizer.myEvents.isInitialized(),
  events: store.ui.organizer.myEvents.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZER_EVENTS'),
  onSelect: eventId => router.push(`/organizer/event/${eventId}`),
})

export default compose(
  forRoute.absolute('HOME_ORGANIZER'), //
  inject(mapStore), //
  loader, //
)(Events)
