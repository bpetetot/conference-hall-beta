import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import OrganizationForm from './organizationForm'

const mapStore = (store, { userId }) => ({
  submitting: store.ui.loaders.get().isOrganizationSaving,
  onSubmit: (data) => {
    store.dispatch({ type: '@@ui/ON_CREATE_ORGANIZATION', payload: { userId, data } })
  },
})

export default compose(
  forRoute.absolute('organizer-organization-create'), //
  inject(mapStore), //
)(OrganizationForm)
