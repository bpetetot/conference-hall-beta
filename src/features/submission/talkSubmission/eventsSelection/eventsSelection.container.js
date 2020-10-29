import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'components/loader'
import getMyEvents from 'store/reducers/ui/speaker/myEvents.selector'
import EventsSelection from './eventsSelection'

const mapStore = (store, { talkId }) => ({
  loaded: store.ui.speaker.myEvents.isInitialized(),
  events: getMyEvents(store),
  load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_EVENTS'),
  onSelect: () => {
    store.ui.speaker.submission.set({ talkId, currentStep: 1 })
  },
})

export default compose(
  inject(mapStore), //
  loader, //
)(EventsSelection)
