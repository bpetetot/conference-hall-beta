import { inject } from '@k-ramel/react'

import Submissions from './submissions'

const mapStore = (store, { eventId }) => {
  const { name: eventName } = store.data.events.get(eventId) || {}
  return {
    eventName,
  }
}

export default inject(mapStore)(Submissions)
