import { connect } from 'react-redux'

import { isRouteNotFound } from 'redux/routes'
import NotFound from './notFound'

const mapState = state => ({
  isRouteNotFound: isRouteNotFound(state),
})

export default connect(mapState)(NotFound)
