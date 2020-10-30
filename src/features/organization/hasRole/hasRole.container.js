import { inject } from '@k-ramel/react'

import HasRole from './hasRole'

const mapStore = (store, { forEventId }) => {
  const event = store.data.events.get(forEventId)
  return {
    eventOwner: event?.owner,
    eventOrganizationId: event?.organization,
  }
}

export default inject(mapStore)(HasRole)
