import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Submissions from './submissions'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const talks = store.ui.speaker.myTalks
    .getAsArray()
    .filter(talk => !!talk.submissions[eventId])
    .map(talk => talk.submissions[eventId])

  return {
    eventId,
    talks,
    loaded: store.ui.speaker.myTalks.isInitialized(),
    load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_TALKS'),
    onSelect: () => {},
  }
}

export default compose(
  forRoute('speaker-event-submissions'),
  inject(mapStore),
  loader,
)(Submissions)
