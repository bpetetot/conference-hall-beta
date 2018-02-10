import { inject } from 'k-ramel/react'
import { getBaseRoute, getAppTitle } from 'redux/router'

import Brand from './brand'

export default inject(store => ({
  title: getAppTitle(store.getState()),
  baseRoute: getBaseRoute(store.getState()),
}))(Brand)
