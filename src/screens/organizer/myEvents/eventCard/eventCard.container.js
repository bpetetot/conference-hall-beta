import { connect } from 'react-redux'
import { push } from 'redux-little-router'

import events from 'redux/data/organizer/events'
import EventCard from './eventCard'

const mapState = (state, { id }) => ({
  ...events.get(id)(state),
})

const mapDispatch = (dispatch, { id }) => ({
  goToEvent: () => dispatch(push(`/organizer/event/${id}`)),
})

export default connect(mapState, mapDispatch)(EventCard)
