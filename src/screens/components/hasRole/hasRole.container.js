import { inject } from '@k-ramel/react'

import HasRole from './hasRole'

const mapStore = (store, { forEventId, forOrganizationId }) => {
  const event = store.data.events.get(forEventId)
  const organization = store.data.organizations.get()[event?.organization ?? forOrganizationId]

  return {
    eventOwner: event?.owner,
    orgaMembers: organization?.members,
  }
}

export default inject(mapStore)(HasRole)
