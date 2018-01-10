import { combineReducers } from 'redux'
import app from './app'
import myTalks from './myTalks'
import submission from './submission'

export default combineReducers({
  app,
  myTalks,
  submission,
})
