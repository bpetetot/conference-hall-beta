import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import EventEdit from './eventForm'

const mapState = () => ({
  form: 'event-create',
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: 'event-create' },
    }),
})

export default forRoute('CREATE_EVENT', { absolute: true })(connect(mapState, mapDispatch)(EventEdit))
