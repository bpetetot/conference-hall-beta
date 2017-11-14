import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import events from 'redux/data/organizer/events'
import LoadingIndicator from 'components/loading'
import MyEvents from './myEvents'

const mapState = state => ({
  loaded: events.isInitialized(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'MY_EVENTS_SEARCH' }),
})

export default compose(
  forRoute('HOME_ORGANIZER', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(MyEvents)
