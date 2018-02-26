import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import OrganizationForm from '../components/organizationForm'

const FORM_NAME = 'organization-create'

const mapStore = store => ({
  form: FORM_NAME,
  onSubmit: () => store.dispatch('@@ui/ON_CREATE_ORGANIZATION'),
})

export default compose(
  forRoute.absolute('CREATE_ORGANIZATION'), //
  inject(mapStore), //
)(OrganizationForm)
