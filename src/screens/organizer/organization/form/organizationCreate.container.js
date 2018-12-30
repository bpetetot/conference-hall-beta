import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import OrganizationForm from './organizationForm'

const mapStore = store => ({
  submitting: store.ui.loaders.get().isOrganizationSaving,
  onSubmit: (payload) => {
    store.dispatch({ type: '@@ui/ON_CREATE_ORGANIZATION', payload })
  },
})

export default compose(
  forRoute.absolute('organizer-organization-create'), //
  inject(mapStore), //
)(OrganizationForm)
