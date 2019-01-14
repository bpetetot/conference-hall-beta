import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Submissions from './submissions'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const talks = store.ui.speaker.myTalks
    .getAsArray()
    .filter(talk => talk.submissions && !!talk.submissions[eventId])
    .map(talk => talk.submissions[eventId])

  const { name: eventName } = store.data.events.get(eventId) || {}

  const loaded = store.ui.speaker.myTalks.isInitialized() && store.data.events.hasKey(eventId)

  return {
    eventId,
    eventName,
    talks,
    loaded,
    load: () => store.dispatch('@@ui/ON_LOAD_SPEAKER_TALKS'),
    onSelect: talkId => router.push('speaker-event-submission-page', { eventId, talkId }),
  }
}

export default compose(
  forRoute.absolute('speaker-event-submissions'),
  inject(mapStore),
  loader,
)(Submissions)
