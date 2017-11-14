import { connect } from 'react-redux'

import withRoute from 'components/withRoute'
import event from 'redux/data/event'
import EventInfo from './eventInfo'

const mapState = state => ({
  ...event.get()(state),
})

export default withRoute(connect(mapState)(EventInfo))
