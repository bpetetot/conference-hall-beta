import { reducer as form } from 'redux-form'
import { reducer as router } from './router'
import auth from './auth'
import data from './data'
import ui from './ui'

export default {
  router,
  form,
  auth,
  data,
  ui,
}
