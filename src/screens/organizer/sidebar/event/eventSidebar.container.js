import { inject } from '@k-ramel/react'

import { getRouterParam } from 'store/reducers/router'
import EventSidebar from './eventSidebar'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const { name } = store.data.events.get(eventId) || {}
  return { eventId, name }
}

export default inject(mapStore)(EventSidebar)
