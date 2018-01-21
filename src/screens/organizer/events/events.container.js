import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import organizerEvents from 'redux/ui/organizer/myEvents'
import loader from 'components/loader'
import Events from './events'

const mapState = state => ({
  loaded: organizerEvents.isInitialized(state),
  events: organizerEvents.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_ORGANIZER_EVENTS_PAGE' }),
  onSelect: eventId => dispatch({ type: 'ORGANIZER/OPEN_EVENT_PAGE', payload: { eventId } }),
})

export default compose(
  forRoute.absolute('HOME_ORGANIZER'), //
  connect(mapState, mapDispatch), //
  loader, //
)(Events)
