import { router } from '@k-redux-router/react-k-ramel'
import routes from './routes'

export * from './router.selectors'

export default router({
  routes,
  state: 'ui.router',
  getState: state => state.ui.router,
})
