import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import ApiForm from './api'

const FORM_NAME = 'api-edit'

const mapStore = (store, { eventId }, { form }) => {
  const event = store.data.events.get(eventId)
  const { apiActive } = form(FORM_NAME).getFormValues() || {}
  return {
    apiActive,
    initialValues: event,
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_EVENT_API'),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT_API'),
  inject(mapStore),
  reduxForm({ form: FORM_NAME }),
)(ApiForm)
