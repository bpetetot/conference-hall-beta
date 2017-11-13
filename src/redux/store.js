import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import sagas from 'sagas'
import { middleware as routerMiddleware, enhancer } from './routes'

import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(routerMiddleware, sagaMiddleware), enhancer),
)

sagaMiddleware.run(sagas)

store.dispatch({ type: 'INITIALIZE_FIREBASE' })

export default store
