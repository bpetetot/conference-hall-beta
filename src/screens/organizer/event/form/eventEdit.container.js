import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import event from 'redux/data/event'
import EventEdit from './eventForm'

const FORM_NAME = 'event-edit'
const select = formValueSelector(FORM_NAME)

const mapState = state => ({
  form: FORM_NAME,
  type: select(state, 'type'),
  initialValues: event.get()(state),
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: FORM_NAME },
    }),
})

export default forRoute('EDIT_EVENT', { absolute: true })(connect(mapState, mapDispatch)(EventEdit))
