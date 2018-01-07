import { connect } from 'react-redux'

import { getEventIdFromRouterParam } from 'redux/data/events'
import EventTabs from './eventTabs'

const mapState = state => ({ id: getEventIdFromRouterParam(state) })

export default connect(mapState)(EventTabs)
