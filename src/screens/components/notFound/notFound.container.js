import { connect } from 'react-redux'

import { isRouteNotFound } from 'redux/router'
import NotFound from './notFound'

const mapState = state => ({
  isRouteNotFound: isRouteNotFound(state),
})

export default connect(mapState)(NotFound)
