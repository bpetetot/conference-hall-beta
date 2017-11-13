import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as router } from './routes'
import auth from './auth'
import data from './data'
import ui from './ui'

export default combineReducers({
  router,
  form,
  auth,
  data,
  ui,
})
