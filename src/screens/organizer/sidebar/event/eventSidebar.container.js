import { connect } from 'react-redux'

import { getEventFromRouterParam } from 'redux/data/events'
import EventSidebar from './eventSidebar'

const mapState = state => ({ ...getEventFromRouterParam(state) })

export default connect(mapState)(EventSidebar)
