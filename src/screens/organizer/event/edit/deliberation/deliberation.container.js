import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import DeliberationForm from './deliberation'

const FORM_NAME = 'deliberation-edit'

const mapStore = (store, { eventId }, { form }) => {
  const event = store.data.events.get(eventId)
  const { deliberationActive } = form(FORM_NAME).getFormValues() || {}
  return {
    deliberationActive,
    initialValues: event,
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_EVENT_DELIBERATION'),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT_DELIBERATION'),
  inject(mapStore),
  reduxForm({ form: FORM_NAME }),
)(DeliberationForm)
