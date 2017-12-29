import { connect } from 'react-redux'

import event from 'redux/data/event'
import EventTabs from './eventTabs'

const mapState = (state) => {
  const { id } = event.get()(state)
  return { id }
}

export default connect(mapState)(EventTabs)
