import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import event from 'redux/data/event'
import LoadingIndicator from 'components/loading'
import Event from './event'

const mapState = state => ({
  loaded: event.isInitialized(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'FETCH_EVENT' }),
})

const Loadable = loader({ print: ['loaded'], LoadingIndicator })(Event)

export default connect(mapState, mapDispatch)(Loadable)
