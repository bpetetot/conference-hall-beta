import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { reducer as form } from 'redux-form'
import { reducer as router, middleware as routerMiddleware, enhancer } from './routes'
import firebase, { middleware as firebaseMiddleware } from './firebase'

import auth from './auth'
import event, { eventSaga } from './event'

const sagaMiddleware = createSagaMiddleware()

/** create redux store */
const store = createStore(
  combineReducers({
    router,
    auth,
    form,
    event,
  }),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware,
      firebaseMiddleware,
      sagaMiddleware,
      thunk.withExtraArgument(firebase),
    ),
    enhancer,
  ),
)

sagaMiddleware.run(eventSaga)

export default store
