import { inject } from '@k-ramel/react'

import Brand from './brand'

export default inject((store, props, { router }) => ({
  title: router.getParam('title'),
  baseRoute: router.getParam('root'),
}))(Brand)
