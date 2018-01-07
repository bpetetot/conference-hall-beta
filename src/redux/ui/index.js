import { combineReducers } from 'redux'
import modal from './modal'
import toaster from './toaster'
import speaker from './speaker'

export default combineReducers({
  modal,
  toaster,
  speaker,
})
