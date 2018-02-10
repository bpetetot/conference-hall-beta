import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import { isAuthenticated } from 'redux/auth'
import Login from './login'

const mapStore = store => ({
  authenticated: isAuthenticated(store.getState()),
  signin: provider => store.dispatch({ type: 'AUTH/SIGN_IN', payload: provider }),
})

export default compose(
  forRoute.absolute('LOGIN'), //
  inject(mapStore), //
)(Login)
