import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import event from 'redux/data/event'
import LoadingIndicator from 'components/loading'
import EventInfo from './eventInfo'

const mapState = state => ({
  loaded: event.isInitialized(state),
  ...event.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_EVENT' }),
})

export default compose(
  forRoute('CONSULT_EVENT', { absolute: true }),
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(EventInfo)
