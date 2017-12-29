import { connect } from 'react-redux'

import event from 'redux/data/event'
import EventSidebar from './eventSidebar'

const mapState = (state) => {
  const { id, name } = event.get()(state)
  return { id, name }
}

export default connect(mapState)(EventSidebar)
