import { combineReducers } from 'redux'
import app from './app'
import talks from './talks'

export default combineReducers({
  app,
  talks,
})
