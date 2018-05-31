import { inject } from '@k-ramel/react'

import AuthErrorModal from './authError'

const mapStore = store => ({
  ...store.auth.get(),
  clearAuthError: () => store.auth.update({ error: {} }),
})

export default inject(mapStore)(AuthErrorModal)
