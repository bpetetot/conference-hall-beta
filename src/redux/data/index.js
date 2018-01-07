import { combineReducers } from 'redux'
import users from './users'
import event from './event'
import events from './events'
import talks from './talks'

export default combineReducers({
  users,
  event,
  events,
  talks,
})
