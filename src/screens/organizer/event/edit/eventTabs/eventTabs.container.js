import { connect } from 'react-redux'

import { getRouterParam } from 'redux/router'
import EventTabs from './eventTabs'

const mapState = state => ({ id: getRouterParam('eventId')(state) })

export default connect(mapState)(EventTabs)
