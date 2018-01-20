import { combineReducers } from 'redux'
import users from './users'
import events from './events'
import talks from './talks'
import proposals from './proposals'
import ratings from './ratings'

export default combineReducers({
  users,
  events,
  talks,
  proposals,
  ratings,
})
