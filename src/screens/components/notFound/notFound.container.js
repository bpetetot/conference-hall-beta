import { inject } from '@k-ramel/react'

import { isRouteNotFound } from 'store/drivers/redux-little-router'
import NotFound from './notFound'

export default inject(store => ({
  isRouteNotFound: isRouteNotFound(store.getState()),
}))(NotFound)
