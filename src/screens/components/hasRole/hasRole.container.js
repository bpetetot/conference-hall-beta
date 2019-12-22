import { inject } from '@k-ramel/react'

import HasRole from './hasRole'

const mapStore = (store, { of, forEventId, forOrganizationId }) => {
  const event = store.data.events.get(forEventId)
  const organization = store.data.organizations.get()[event?.organization ?? forOrganizationId]
  const { uid } = store.auth.get()
  const roles = Array.isArray(of) ? of : [of]

  return {
    authorized: roles.includes(organization?.members?.[uid]) || event.owner === uid,
  }
}

export default inject(mapStore)(HasRole)
