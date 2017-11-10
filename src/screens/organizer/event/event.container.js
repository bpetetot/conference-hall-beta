import { connect } from 'react-redux'

import { saveEvent } from '../../../redux/event'
import Event from './event'

const mapState = () => ({
  initialValues: { name: 'test' },
})

const mapDispatch = dispatch => ({
  onSubmit: event => dispatch(saveEvent(event)),
})

export default connect(mapState, mapDispatch)(Event)
