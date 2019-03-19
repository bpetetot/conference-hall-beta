import { createStore } from 'k-ramel'
import { router } from '@k-redux-router/react-k-ramel'

import reducers from './reducers'
import listeners from './listeners'
import routes from './routes'

/**
 * Store and dispatch actions are managed with k-ramel
 * Documentation: https://github.com/alakarteio/k-ramel
 */
const store = createStore(reducers, {
  listeners,
  drivers: {
    router: router({
      routes,
      state: 'ui.router',
      getState: state => state.ui.router,
    }),
  },
})

export default store
