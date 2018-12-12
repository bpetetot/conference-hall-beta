import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'

import OrganizationForm from './organizationForm'

const mapStore = (store, ownProps, { router }) => {
  const organizationId = router.getRouteParam('organizationId')
  const organization = store.data.organizations.get(organizationId)
  return {
    loaded: !!organization,
    initialValues: organization,
    onSubmit: payload => store.dispatch({ type: '@@ui/ON_UPDATE_ORGANIZATION', payload }),
    load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZATION'),
  }
}

export default compose(
  forRoute.absolute('EDIT_ORGANIZATION'), //
  inject(mapStore), //
  loader,
)(OrganizationForm)
