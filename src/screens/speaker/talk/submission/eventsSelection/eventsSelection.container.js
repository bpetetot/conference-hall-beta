import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'components/loader'
import getMyEvents from 'store/reducers/ui/speaker/myEvents.selector'
import EventsSelection from './eventsSelection'

const mapStore = (store, { talkId }) => ({
  loaded: store.ui.speaker.myEvents.isInitialized(),
  events: getMyEvents(store),
  load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_EVENTS'),
  onSelect: (eventId) => {
    store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { eventId, talkId } })
  },
})

export default compose(
  inject(mapStore), //
  loader, //
)(EventsSelection)
