import { connect } from 'react-redux'

import event from 'redux/data/event'
import EventInfo from './eventInfo'

const mapState = state => ({
  ...event.get()(state),
})

export default connect(mapState)(EventInfo)
