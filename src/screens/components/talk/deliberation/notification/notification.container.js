import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Notification from './notification'

const mapStore = (store, { eventId, talkId }) => {
  const { name } = store.data.events.get(eventId) || {}
  return {
    name,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    },
    onConfirm: () => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_TALK_SUBMISSION_STATE',
        payload: {
          eventId,
          talkId,
          state: 'confirmed',
        },
      })
    },
    onDecline: () => {
      store.dispatch({
        type: '@@ui/ON_UPDATE_TALK_SUBMISSION_STATE',
        payload: {
          eventId,
          talkId,
          state: 'declined',
        },
      })
    },
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Notification)
