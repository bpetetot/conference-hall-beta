import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { reducer as router, middleware as routerMiddleware, enhancer } from './routes'
import firebase, { middleware as firebaseMiddleware } from './firebase'

import auth from './auth'

/** create redux store */
const store = createStore(
  combineReducers({ router, auth }),
  composeWithDevTools(
    applyMiddleware(routerMiddleware, firebaseMiddleware, thunk.withExtraArgument(firebase)),
    enhancer,
  ),
)

export default store
