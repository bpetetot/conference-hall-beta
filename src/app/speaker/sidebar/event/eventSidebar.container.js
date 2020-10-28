import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store, { eventId }) => {
  const { id, name, surveyActive } = store.data.events.get(eventId) || {}
  return { id, name, surveyActive }
}

export default inject(mapStore)(EventSidebar)
