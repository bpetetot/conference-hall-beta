import { createStore, compose, applyMiddleware } from 'k-ramel'
import { middleware, enhancer } from './reducers/router'

import reducers from './reducers'
import listeners from './listeners'
import drivers from './drivers'

const store = createStore(reducers, {
  listeners,
  drivers,
  enhancer: compose(enhancer, applyMiddleware(middleware)),
  devtools: true,
})

export default store
