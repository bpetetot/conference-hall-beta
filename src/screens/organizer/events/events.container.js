import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import organizerEvents from 'redux/data/events'
import LoadingIndicator from 'components/loading'
import Events from './events'

const mapState = state => ({
  loaded: organizerEvents.isInitialized(state),
  events: organizerEvents.getKeys(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_ORGANIZER_EVENTS' }),
})

export default compose(
  forRoute('HOME_ORGANIZER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Events)
