import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store) => {
  const { currentEventId } = store.ui.app.get()
  const { name } = store.data.events.get(currentEventId) || {}
  return { eventId: currentEventId, name }
}

export default inject(mapStore)(EventSidebar)
