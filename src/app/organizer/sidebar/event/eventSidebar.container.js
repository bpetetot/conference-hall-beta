import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store, { eventId }) => {
  const { id, name } = store.data.events.get(eventId) || {}
  return { eventId: id, name }
}

export default inject(mapStore)(EventSidebar)
