import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import Login from './login'

const mapStore = store => ({
  authenticated: store.auth.authenticated,
  signin: provider => store.dispatch({ type: '@@ui/SIGN_IN', payload: provider }),
})

export default compose(
  forRoute.absolute('LOGIN'), //
  inject(mapStore), //
)(Login)
