import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { reducer as form } from 'redux-form'
import { reducer as router, middleware as routerMiddleware, enhancer } from './routes'
import firebase, { middleware as firebaseMiddleware } from './firebase'

import auth from './auth'
import event from './event'

/** create redux store */
const store = createStore(
  combineReducers({
    router, auth, form, event,
  }),
  composeWithDevTools(
    applyMiddleware(routerMiddleware, firebaseMiddleware, thunk.withExtraArgument(firebase)),
    enhancer,
  ),
)

export default store
