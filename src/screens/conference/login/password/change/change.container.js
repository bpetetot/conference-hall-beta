import { inject } from '@k-ramel/react'

import ChangePasswordModal from './change'

const mapStore = (store) => {
  const error = store.auth.get().changePasswordError || {}
  return {
    error: error.message,
    sendChangePasswordEmail: (email, closeModal) => store.dispatch({
      type: '@@ui/FORGOT_PASSWORD',
      payload: { email, closeModal },
    }),
  }
}

export default inject(mapStore)(ChangePasswordModal)
