import { inject } from 'k-ramel/react'
import { goBack } from 'redux-little-router'
import { getBaseRoute, getAppTitle, isMobileMenuRoute } from 'redux/router'

import BrandMobile from './brandMobile'

export default inject(store => ({
  title: getAppTitle(store.getState()),
  baseRoute: getBaseRoute(store.getState()),
  opened: isMobileMenuRoute(store.getState()),
  goBack: () => store.dispatch(goBack()),
}))(BrandMobile)
