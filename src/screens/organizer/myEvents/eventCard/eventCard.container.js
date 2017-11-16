import { connect } from 'react-redux'

import events from 'redux/data/organizer/events'
import EventCard from './eventCard'

const mapState = (state, { id }) => ({
  ...events.get(id)(state),
})

export default connect(mapState)(EventCard)
