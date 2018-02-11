import { createStore } from 'k-ramel'
import { compose, applyMiddleware } from 'redux'

import sagas from 'sagas'
import createSagaMiddleware from 'redux-saga'
import { middleware as routerMiddleware, enhancer as routerEnhancer } from './reducers/router'

import reducers from './reducers'
import listeners from './listeners'

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(applyMiddleware(routerMiddleware, sagaMiddleware), routerEnhancer)

const store = createStore(reducers, { listeners, enhancer, devtools: true })

sagaMiddleware.run(sagas)

export default store
