import driver from '@k-ramel/driver-redux-little-router'
import routes from './routes'

export * from './router.selectors'

export default driver(routes)
