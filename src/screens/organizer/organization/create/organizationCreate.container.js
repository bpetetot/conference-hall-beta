import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import OrganizationForm from '../components/organizationForm'

const FORM_NAME = 'organization-create'
const select = formValueSelector(FORM_NAME)

const mapStore = store => ({
  form: FORM_NAME,
  type: select(store.getState(), 'type'),
  onSubmit: () => store.dispatch('@@ui/ON_CREATE_ORGANIZATION'),
})

export default compose(
  forRoute.absolute('CREATE_ORGANIZATION'), //
  inject(mapStore), //
)(OrganizationForm)
