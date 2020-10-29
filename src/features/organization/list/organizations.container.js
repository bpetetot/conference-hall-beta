import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import Organizations from './organizations'

const mapStore = (store, { userId }) => ({
  loaded: store.data.organizations.isInitialized(),
  organizations: store.data.organizations.getAsArray(),
  load: () => store.dispatch({ type: '@@ui/ON_LOAD_USER_ORGANIZATIONS', payload: { userId } }),
})

export default compose(inject(mapStore), loader)(Organizations)
