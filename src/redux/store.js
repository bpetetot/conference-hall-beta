import { createStore } from 'k-ramel'
import { compose, applyMiddleware } from 'redux'

import sagas from 'sagas'
import createSagaMiddleware from 'redux-saga'
import { middleware as routerMiddleware, enhancer as routerEnhancer } from './router'

import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(applyMiddleware(routerMiddleware, sagaMiddleware), routerEnhancer)

const store = createStore({ ...reducers }, { devtools: true, enhancer, hideRedux: false })

sagaMiddleware.run(sagas)

store.dispatch({ type: 'FIREBASE/INITIALIZE' })

export default store
