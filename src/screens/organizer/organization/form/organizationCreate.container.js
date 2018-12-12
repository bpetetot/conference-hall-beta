import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import OrganizationForm from './organizationForm'

const mapStore = store => ({
  onSubmit: payload => store.dispatch({ type: '@@ui/ON_CREATE_ORGANIZATION', payload }),
})

export default compose(
  forRoute.absolute('CREATE_ORGANIZATION'), //
  inject(mapStore), //
)(OrganizationForm)
