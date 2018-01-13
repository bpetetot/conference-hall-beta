import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import forRoute from 'hoc-little-router'

import eventsData from 'redux/data/events'
import CFPForm from './cfp'

const FORM_NAME = 'cfp-edit'

const mapState = (state, { eventId }) => {
  const {
    id,
    type,
    cfpOpened = false,
    deliberationDate = null,
    cfpDates = {},
    categories = [],
    formats = [],
  } =
    eventsData.get(eventId)(state) || {}
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
  }
}

const mapDispatch = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_UPDATE_CFP_FORM', payload: data }),
})

export default compose(
  forRoute('EDIT_EVENT_CFP', { absolute: true }),
  connect(mapState, mapDispatch),
  reduxForm({ form: FORM_NAME }),
)(CFPForm)
