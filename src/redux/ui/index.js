import { combineReducers } from 'redux'
import modal from './modal'
import toaster from './toaster'

export default combineReducers({
  modal,
  toaster,
})
