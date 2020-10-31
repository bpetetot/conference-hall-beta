import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import loader from 'hoc-react-loader/build/core'

import Notification from './notification'

const mapStore = (store, { eventId }) => {
  const { name } = store.data.events.get(eventId) || {}
  return {
    name,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: { eventId } })
    },
  }
}

export default compose(
  inject(mapStore), //
  loader(), //
)(Notification)
