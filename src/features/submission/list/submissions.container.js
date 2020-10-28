import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'

import Submissions from './submissions'

const mapStore = (store, { userId, eventId }) => {
  const talks = store.ui.speaker.myTalks
    .getAsArray()
    .filter((talk) => talk.submissions && !!talk.submissions[eventId])
    .map((talk) => talk.submissions[eventId])

  const { name: eventName } = store.data.events.get(eventId) || {}

  const loaded = store.ui.speaker.myTalks.isInitialized() && store.data.events.hasKey(eventId)

  return {
    eventName,
    talks,
    loaded,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_SPEAKER_TALKS', payload: { userId } }),
  }
}

export default compose(inject(mapStore), loader)(Submissions)
