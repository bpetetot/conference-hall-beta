import { inject } from '@k-ramel/react'
import { getBaseRoute, getAppTitle, isMobileMenuRoute } from 'store/drivers/redux-little-router'

import BrandMobile from './brandMobile'

export default inject((store, props, { router }) => ({
  title: getAppTitle(store.getState()),
  baseRoute: getBaseRoute(store.getState()),
  opened: isMobileMenuRoute(store.getState()),
  goBack: router.goBack,
}))(BrandMobile)
