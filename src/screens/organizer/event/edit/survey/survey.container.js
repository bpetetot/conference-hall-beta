import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import SurveyForm from './survey'

const FORM_NAME = 'survey-edit'

const mapStore = (store, { eventId }, { form }) => {
  const event = store.data.events.get(eventId)
  const { surveyActive } = form(FORM_NAME).getFormValues() || {}
  return {
    surveyActive,
    initialValues: event,
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_EVENT_SURVEY'),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT_SURVEY'),
  inject(mapStore),
  reduxForm({ form: FORM_NAME }),
)(SurveyForm)
