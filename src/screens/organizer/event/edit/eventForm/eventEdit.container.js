import { compose } from 'redux'
import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import eventsData from 'redux/data/events'
import EventForm from '../../components/eventForm'

const FORM_NAME = 'event-edit'
const select = formValueSelector(FORM_NAME)

const mapState = (state, { eventId }) => {
  const event = eventsData.get(eventId)(state)
  return {
    form: FORM_NAME,
    type: select(state, 'type'),
    initialValues: event,
  }
}

const mapDispatch = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_UPDATE_EVENT_FORM', payload: data }),
})

export default compose(
  forRoute.absolute('EDIT_EVENT'), //
  connect(mapState, mapDispatch), //
)(EventForm)
