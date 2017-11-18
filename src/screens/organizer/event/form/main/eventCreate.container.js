import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import forRoute from 'hoc-little-router'

import EventEdit from './mainForm'

const FORM_NAME = 'event-create'
const select = formValueSelector(FORM_NAME)

const mapState = state => ({
  form: FORM_NAME,
  type: select(state, 'type'),
  initialValues: { type: 'conference' },
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: FORM_NAME },
    }),
})

export default forRoute('CREATE_EVENT', { absolute: true })(connect(mapState, mapDispatch)(EventEdit))
