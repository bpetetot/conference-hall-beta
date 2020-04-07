import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store) => {
  const { currentEventId } = store.ui.app.get()
  const { id, name, surveyActive } = store.data.events.get(currentEventId) || {}
  return { id, name, surveyActive }
}

export default inject(mapStore)(EventSidebar)
