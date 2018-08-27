import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'

import Signup from './signup'

const mapStore = (store) => {
  const { message } = store.auth.get().signupError
  return {
    form: 'signup',
    authError: message,
    onSubmit: () => store.dispatch('@@ui/SIGN_UP'),
  }
}

export default compose(
  inject(mapStore), //
  reduxForm(), //
)(Signup)
