import { combineReducers } from 'redux'
import user from './user'
import event from './event'
import organizer from './organizer'

export default combineReducers({
  user,
  event,
  organizer,
})
