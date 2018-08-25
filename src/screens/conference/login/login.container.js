import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import Login from './login'

const mapStore = (store) => {
  const { authenticated } = store.auth.get()
  return { authenticated }
}

export default compose(
  forRoute.absolute('LOGIN'), //
  inject(mapStore), //
)(Login)
