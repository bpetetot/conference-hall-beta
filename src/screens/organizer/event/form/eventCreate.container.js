import { connect } from 'react-redux'

import EventEdit from './eventForm'

const mapState = () => ({
  mode: 'create',
})

const mapDispatch = dispatch => ({
  onSubmit: data =>
    dispatch({
      type: 'SUBMIT_EVENT_FORM',
      payload: { event: data, mode: 'create' },
    }),
})

export default connect(mapState, mapDispatch)(EventEdit)
