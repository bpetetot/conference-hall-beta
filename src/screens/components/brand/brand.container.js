import { connect } from 'react-redux'
import { getBaseRoute, getAppTitle } from 'redux/routes'

import Brand from './brand'

const mapState = state => ({
  title: getAppTitle(state),
  baseRoute: getBaseRoute(state),
})

export default connect(mapState)(Brand)
