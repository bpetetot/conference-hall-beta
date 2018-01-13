import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import eventsData from 'redux/data/events'
import loader from 'components/loader'
import EventEdit from './eventEdit'

const mapState = (state) => {
  const eventId = getRouterParam('eventId')(state)
  const event = eventsData.get(eventId)(state)
  return { loaded: !!event, eventId }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_EVENT_PAGE' }),
})

export default compose(
  forRoute('EDIT_EVENT'), //
  connect(mapState, mapDispatch), //
  loader, //
)(EventEdit)
