import { combineReducers } from 'redux'
import user from './user'
import event from './event'

export default combineReducers({
  user,
  event,
})
