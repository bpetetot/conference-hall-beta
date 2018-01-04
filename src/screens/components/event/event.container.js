import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import { isPublicRoute } from 'redux/routes'
import event from 'redux/data/event'
import LoadingIndicator from 'components/loading'
import Event from './event'

const mapState = state => ({
  loaded: event.isInitialized(state),
  isPublic: isPublicRoute(state),
  ...event.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_EVENT' }),
})

export default compose(
  connect(mapState, mapDispatch),
  loader({ print: ['loaded'], LoadingIndicator }),
)(Event)
