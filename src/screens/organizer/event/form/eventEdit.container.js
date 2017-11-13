import { connect } from 'react-redux'

import event from 'redux/data/event'
import EventEdit from './eventForm'

const mapState = state => ({
  form: 'event-edit',
  initialValues: event.get()(state),
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, form: 'event-edit' },
    }),
})

export default connect(mapState, mapDispatch)(EventEdit)
