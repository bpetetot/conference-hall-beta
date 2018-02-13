import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import { push } from 'redux-little-router'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import Events from './events'

const mapStore = store => ({
  loaded: store.ui.organizer.myEvents.isInitialized(),
  events: store.ui.organizer.myEvents.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZER_EVENTS' }),
  onSelect: eventId => store.dispatch(push(`/organizer/event/${eventId}`)),
})

export default compose(
  forRoute.absolute('HOME_ORGANIZER'), //
  inject(mapStore), //
  loader, //
)(Events)
