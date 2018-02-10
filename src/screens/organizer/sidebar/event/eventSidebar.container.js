import { inject } from 'k-ramel/react'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import EventSidebar from './eventSidebar'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const event = eventsData.get(eventId)(store.getState())
  return { ...event }
}

export default inject(mapStore)(EventSidebar)
