import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { reduxForm } from 'redux-form'

import PasswordSignin from './password'

const mapStore = (store) => {
  const { message } = store.auth.get().signinError
  return {
    form: 'signin',
    authError: message,
    onSubmit: () => store.dispatch('@@ui/SIGN_IN_WITH_PASSWORD'),
  }
}

export default compose(
  inject(mapStore), //
  reduxForm(), //
)(PasswordSignin)
