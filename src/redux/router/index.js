import { routerForBrowser } from 'redux-little-router'
import routes from './routes'

// router selectors
export * from './router.selectors'

// redux-little-router configuration
export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
