import driver from '@k-ramel/driver-redux-little-router'
import routes from './routes'

// router selectors
export * from './router.selectors'

// router driver for k-ramel
export default driver(routes, state => state.router)
