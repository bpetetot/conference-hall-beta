import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Login from './login'

const mapStore = store => ({
  ...store.auth.get(),
  signin: provider => store.dispatch({ type: '@@ui/SIGN_IN', payload: provider }),
  clearAuthError: () => store.auth.update({ error: {} }),
})

export default compose(
  forRoute.absolute('login'), //
  inject(mapStore), //
)(Login)
