import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import Organizations from './organizations'

const mapStore = (store, { userId }, { router }) => ({
  loaded: store.data.organizations.isInitialized(),
  organizations: store.data.organizations.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_USER_ORGANIZATIONS', payload: { userId } }),
  onSelect: (organizationId) => router.push('organizer-organization-page', { organizationId }),
})

export default compose(
  forRoute.absolute('organizer-organizations'), //
  inject(mapStore), //
  loader, //
)(Organizations)
