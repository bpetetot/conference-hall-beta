import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import EventForm from '../components/eventForm'

const FORM_NAME = 'event-create'
const select = formValueSelector(FORM_NAME)

const mapState = state => ({
  form: FORM_NAME,
  type: select(state, 'type'),
  initialValues: { type: 'conference', conferenceDates: {} },
})

const mapDispatch = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_CREATE_EVENT_FORM', payload: data }),
})

export default compose(
  forRoute('CREATE_EVENT', { absolute: true }), //
  connect(mapState, mapDispatch), //
)(EventForm)
