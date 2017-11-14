import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import event from 'redux/data/event'
import EventInfo from './eventInfo'

const mapState = state => ({
  ...event.get()(state),
})

export default forRoute('CONSULT_EVENT', { absolute: true })(connect(mapState)(EventInfo))
