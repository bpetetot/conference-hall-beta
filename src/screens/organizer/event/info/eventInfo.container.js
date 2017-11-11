import { connect } from 'react-redux'
import loader from 'hoc-react-loader'

import event, { getEvent } from '../../../../redux/event'
import EventInfo from './eventInfo'

const mapState = state => ({
  loaded: event.isInitialized(state),
  ...event.get()(state),
})

const mapDispatch = dispatch => ({
  load: () => dispatch(getEvent()),
})

const Loadable = loader({ print: ['loaded'] })(EventInfo)

export default connect(mapState, mapDispatch)(Loadable)
