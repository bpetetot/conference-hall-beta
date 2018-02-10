import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import organizerEvents from 'redux/ui/organizer/myEvents'
import loader from 'components/loader'
import Events from './events'

const mapStore = store => ({
  loaded: organizerEvents.isInitialized(store.getState()),
  events: organizerEvents.getAsArray(store.getState()),
  load: () => store.dispatch({ type: 'ON_LOAD_ORGANIZER_EVENTS_PAGE' }),
  onSelect: eventId => store.dispatch({ type: 'ORGANIZER/OPEN_EVENT_PAGE', payload: { eventId } }),
})

export default compose(
  forRoute.absolute('HOME_ORGANIZER'), //
  inject(mapStore), //
  loader, //
)(Events)
