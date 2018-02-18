import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { push } from 'redux-little-router'
import loader from 'hoc-react-loader/build/core'

import Submission from './submission'

const mapStore = (store, { eventId }) => {
  const { id, name } = store.data.events.get(eventId) || {}
  return {
    id,
    name,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    },
    onClickEvent: () => {
      store.dispatch(push(`/speaker/event/${eventId}`))
    },
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Submission)
