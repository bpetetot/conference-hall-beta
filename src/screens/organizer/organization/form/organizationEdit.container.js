import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import OrganizationForm from './organizationForm'

const mapStore = (store, ownProps, { router }) => {
  const organizationId = router.getParam('organizationId')
  const organization = store.data.organizations.get(organizationId)
  return {
    loaded: !!organization,
    initialValues: organization,
    submitting: store.ui.loaders.get().isOrganizationSaving,
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_ORGANIZATION', payload })
    },
    load: () => {
      store.dispatch('@@ui/ON_LOAD_ORGANIZATION')
    },
  }
}

export default compose(
  forRoute.absolute('organizer-organization-edit'), //
  inject(mapStore), //
  loader,
)(OrganizationForm)
