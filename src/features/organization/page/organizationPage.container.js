import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'

import OrganizationPage from './organizationPage'

const mapStore = (store, { organizationId }) => {
  const organization = store.data.organizations.get(organizationId)

  return {
    loaded: store.data.organizations.hasKey(organizationId),
    ...organization,
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZATION', payload: { organizationId } }),
    addMember: (uid) => {
      store.dispatch({ type: '@@ui/ADD_ORGANIZATION_MEMBER', payload: { uid, organizationId } })
    },
  }
}

export default compose(inject(mapStore), loader)(OrganizationPage)
