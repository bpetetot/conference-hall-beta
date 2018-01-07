import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import { getEventFromRouterParam } from 'redux/data/events'
import EventForm from '../../components/eventForm'

const FORM_NAME = 'event-edit'
const select = formValueSelector(FORM_NAME)

const mapState = state => ({
  form: FORM_NAME,
  type: select(state, 'type'),
  initialValues: getEventFromRouterParam(state),
})

const mapDispatch = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_UPDATE_EVENT_FORM', payload: data }),
})

export default forRoute('EDIT_EVENT', { absolute: true })(connect(mapState, mapDispatch)(EventForm))
