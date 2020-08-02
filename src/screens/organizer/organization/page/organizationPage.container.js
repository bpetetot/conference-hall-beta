import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import OrganizationPage from './organizationPage'

const mapStore = (store, _, { router }) => {
  const organizationId = router.getParam('organizationId')
  const organization = store.data.organizations.get(organizationId)

  return {
    loaded: store.data.organizations.hasKey(organizationId),
    ...organization,
    load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZATION'),
    addMember: (uid) =>
      store.dispatch({ type: '@@ui/ADD_ORGANIZATION_MEMBER', payload: { uid, organizationId } }),
  }
}

export default compose(
  forRoute.absolute('organizer-organization-page'),
  inject(mapStore),
  loader,
)(OrganizationPage)
