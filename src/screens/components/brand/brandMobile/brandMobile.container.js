import { connect } from 'react-redux'
import { goBack } from 'redux-little-router'
import { getBaseRoute, getAppTitle, isMobileMenuRoute } from 'redux/routes'

import BrandMobile from './brandMobile'

const mapState = state => ({
  title: getAppTitle(state),
  baseRoute: getBaseRoute(state),
  opened: isMobileMenuRoute(state),
})

const mapDispatch = dispatch => ({
  goBack: () => dispatch(goBack()),
})

export default connect(mapState, mapDispatch)(BrandMobile)
