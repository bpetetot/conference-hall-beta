import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import eventsData from 'redux/data/events'
import CFPForm from './cfp'

const FORM_NAME = 'cfp-edit'

const mapStore = (store, { eventId }) => {
  const {
    id,
    type,
    cfpOpened = false,
    deliberationDate = null,
    cfpDates = {},
    categories = [],
    formats = [],
  } =
    eventsData.get(eventId)(store.getState()) || {}
  return {
    type,
    initialValues: {
      id,
      cfpOpened,
      deliberationDate,
      cfpDates,
      categories,
      formats,
    },
    onSubmit: data => store.dispatch({ type: 'SUBMIT_UPDATE_CFP_FORM', payload: data }),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT_CFP'),
  inject(mapStore),
  reduxForm({ form: FORM_NAME }),
)(CFPForm)
