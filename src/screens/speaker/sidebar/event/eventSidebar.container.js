import { connect } from 'react-redux'

import speakerApp from 'redux/ui/speaker/app'
import eventsData from 'redux/data/events'
import EventSidebar from './eventSidebar'

const mapState = (state) => {
  const { currentEventId } = speakerApp.get()(state)
  const { id, name } = eventsData.get(currentEventId)(state) || {}
  return { id, name }
}

export default connect(mapState)(EventSidebar)
