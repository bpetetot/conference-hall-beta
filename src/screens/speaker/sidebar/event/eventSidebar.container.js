import { inject } from 'k-ramel/react'

import speakerApp from 'redux/ui/speaker/app'
import eventsData from 'redux/data/events'
import EventSidebar from './eventSidebar'

const mapStore = (store) => {
  const { currentEventId } = speakerApp.get()(store.getState())
  const { id, name } = eventsData.get(currentEventId)(store.getState()) || {}
  return { id, name }
}

export default inject(mapStore)(EventSidebar)
