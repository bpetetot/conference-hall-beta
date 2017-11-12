import { connect } from 'react-redux'

import EventEdit from './eventEdit'

const mapState = () => ({
  initialValues: { name: 'test' },
})

const mapDispatch = dispatch => ({
  onSubmit: event => dispatch({ type: 'CREATE_EVENT_FORM', payload: event }),
})

export default connect(mapState, mapDispatch)(EventEdit)
