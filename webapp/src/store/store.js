import { createStore } from 'k-ramel'

import reducers from './reducers'
import listeners from './listeners'

/**
 * Store and dispatch actions are managed with k-ramel
 * Documentation: https://github.com/alakarteio/k-ramel
 */
const store = createStore(reducers, {
  listeners,
})

export default store
