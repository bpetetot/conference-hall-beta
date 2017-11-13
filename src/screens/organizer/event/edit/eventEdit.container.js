import { connect } from 'react-redux'

import EventEdit from './eventEdit'

const mapDispatch = dispatch => ({
  onSubmit: event => dispatch({ type: 'CREATE_EVENT_FORM', payload: event }),
})

export default connect(undefined, mapDispatch)(EventEdit)
