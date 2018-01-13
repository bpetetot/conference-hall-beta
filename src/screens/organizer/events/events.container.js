import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'redux-little-router'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import organizerEvents from 'redux/ui/organizer/myEvents'
import LoadingIndicator from 'components/loading'
import Events from './events'

const mapState = state => ({
  loaded: organizerEvents.isInitialized(state),
  events: organizerEvents.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'ON_LOAD_ORGANIZER_EVENTS_PAGE' }),
  onSelect: eventId => dispatch(push(`/organizer/event/${eventId}`)),
})

export default compose(
  forRoute('HOME_ORGANIZER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Events)
