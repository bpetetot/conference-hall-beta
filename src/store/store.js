import { createStore } from 'k-ramel'

import reducers from './reducers'
import listeners from './listeners'
import drivers from './drivers'

const store = createStore(reducers, {
  listeners,
  drivers,
  devtools: true,
})

export default store
