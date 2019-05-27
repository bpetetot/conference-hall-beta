import { createStore } from 'k-ramel'
import { router } from '@k-redux-router/react-k-ramel'

import reducers from './reducers'
import listeners from './listeners'
import routes from './routes'
import algolia from './drivers/algolia'

/**
 * Store and dispatch actions are managed with k-ramel
 * Documentation: https://github.com/rakunteam/k-ramel
 */
const store = createStore(reducers, {
  listeners,
  drivers: {
    router: router({
      routes,
      state: 'ui.router',
      getState: state => state.ui.router,
    }),
    algolia: algolia({
      id: process.env.REACT_APP_ALGOLIA_ID,
      key: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    }),
  },
})

export default store
