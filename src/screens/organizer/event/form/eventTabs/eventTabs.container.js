import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import event from 'redux/data/event'
import EventTabs from './eventTabs'

const mapState = (state) => {
  const { id } = event.get()(state)
  return { id }
}

export default forRoute('EDIT_EVENT')(connect(mapState)(EventTabs))
