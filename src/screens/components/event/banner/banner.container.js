import { inject } from '@k-ramel/react'

import EventBanner from './banner'

const mapStore = (store, { eventId }) => {
  const {
    name, type, address, bannerUrl,
  } = store.data.events.get(eventId) || {}
  return {
    name,
    type,
    address,
    bannerUrl,
  }
}

export default inject(mapStore)(EventBanner)
