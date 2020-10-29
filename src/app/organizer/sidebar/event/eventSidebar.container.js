import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store, { eventId }) => {
  const { name } = store.data.events.get(eventId) || {}
  return { name }
}

export default inject(mapStore)(EventSidebar)
