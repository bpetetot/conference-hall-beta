import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Submission from './submission'

const mapStore = (store, { eventId, talkId }, { router }) => {
  const { id, name } = store.data.events.get(eventId) || {}
  return {
    id,
    name,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    },
    onClickEdit: () => {
      store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { eventId, talkId } })
    },
    onClickEvent: () => router.push(`/speaker/event/${eventId}`),
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Submission)
