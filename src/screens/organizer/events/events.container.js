import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import events from 'redux/data/events'
import LoadingIndicator from 'components/loading'
import Events from './events'

const mapState = state => ({
  loaded: events.isInitialized(state),
  events: events.getKeys(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_ORGANIZER_EVENTS' }),
})

export default compose(
  forRoute('HOME_ORGANIZER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Events)
