import { combineReducers } from 'redux'
import app from './app'
import talks from './talks'

export * from './app.selectors'

export default combineReducers({
  app,
  talks,
})
