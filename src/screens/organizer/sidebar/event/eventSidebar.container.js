import { connect } from 'react-redux'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import EventSidebar from './eventSidebar'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const event = eventsData.get(eventId)(state)
  return { ...event }
}

export default connect(mapState)(EventSidebar)
