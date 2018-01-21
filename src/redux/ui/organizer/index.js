import { combineReducers } from 'redux'
import myEvents from './myEvents'
import proposal from './proposal'
import proposals from './proposals'

export default combineReducers({
  myEvents,
  proposal,
  proposals,
})
