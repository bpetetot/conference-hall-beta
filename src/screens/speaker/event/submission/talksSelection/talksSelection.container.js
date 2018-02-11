import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import loader from 'components/loader'
import TalksSelection from './talksSelection'

const mapStore = (store, { eventId }) => ({
  loaded: store.ui.speaker.myTalks.isInitialized(),
  talks: store.ui.speaker.myTalks.getAsArray(),
  load: () => {
    store.dispatch({ type: 'ON_LOAD_SPEAKER_TALKS' })
  },
  onSelect: (talkId) => {
    store.dispatch({ type: 'OPEN_SUBMISSION_EVENTINFO_PAGE', payload: { eventId, talkId } })
  },
})

export default compose(
  inject(mapStore), //
  loader, //
)(TalksSelection)
