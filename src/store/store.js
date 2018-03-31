import { createStore } from 'k-ramel'

import reducers from './reducers'
import listeners from './listeners'
import router from './drivers/redux-little-router'
import form from './drivers/reduxForm'

const store = createStore({
  ...reducers,
  router: router.getReducer(),
  form: form.getReducer(),
}, {
  listeners,
  drivers: { form, router },
  enhancer: router.getEnhancer(),
  devtools: true,
})

export default store
