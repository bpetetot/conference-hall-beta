import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'redux/router'
import Proposals from './proposals'

const mapState = state => ({ eventId: getRouterParam('eventId')(state) })

export default compose(
  forRoute.absolute('PROPOSALS'), //
  connect(mapState), //
)(Proposals)
