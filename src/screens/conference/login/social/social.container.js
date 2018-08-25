import { inject } from '@k-ramel/react'

import SocialLogin from './social'

const mapStore = (store) => {
  const providerId = localStorage.getItem('providerId')
  const { providers } = store.auth.get()
  return {
    providerId,
    providers,
    signin: provider => store.dispatch({ type: '@@ui/SIGN_IN', payload: provider }),
  }
}

export default inject(mapStore)(SocialLogin)
