import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import Organizations from './organizations'

const mapStore = store => ({
  loaded: store.ui.organizer.myOrganizations.isInitialized(),
  organizations: store.ui.organizer.myOrganizations.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZER_ORGANIZATIONS'),
  onSelect: () => {},
})

export default compose(
  forRoute.absolute('HOME_ORGANIZATION'), //
  inject(mapStore), //
  loader, //
)(Organizations)
