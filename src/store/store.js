import { createStore } from 'k-ramel'
import { compose, applyMiddleware } from 'redux'
import { middleware as routerMiddleware, enhancer as routerEnhancer } from './reducers/router'

import reducers from './reducers'
import listeners from './listeners'
import drivers from './drivers'

const enhancer = compose(applyMiddleware(routerMiddleware), routerEnhancer)

const store = createStore(reducers, {
  listeners, drivers, enhancer, devtools: true,
})

export default store
