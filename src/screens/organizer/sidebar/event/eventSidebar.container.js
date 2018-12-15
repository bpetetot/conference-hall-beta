import { inject } from '@k-ramel/react'

import EventSidebar from './eventSidebar'

const mapStore = (store, props, { router }) => {
  const eventId = router.getPathParam('eventId')
  const { name } = store.data.events.get(eventId) || {}
  return { eventId, name }
}

export default inject(mapStore)(EventSidebar)
