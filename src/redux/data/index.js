import { combineReducers } from 'redux'
import user from './user'
import event from './event'
import events from './events'
import talk from './talk'
import talks from './talks'

export default combineReducers({
  user,
  event,
  events,
  talk,
  talks,
})
