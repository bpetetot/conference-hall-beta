import { connect } from 'react-redux'
import { getBaseRoute, getAppTitle } from 'redux/router'

import Brand from './brand'

const mapState = state => ({
  title: getAppTitle(state),
  baseRoute: getBaseRoute(state),
})

export default connect(mapState)(Brand)
