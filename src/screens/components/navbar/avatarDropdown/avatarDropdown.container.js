import { inject } from 'k-ramel/react'

import AvatarDropdown from './avatarDropdown'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uid) || {}
  return {
    displayName,
    photoURL,
    signout: () => store.dispatch({ type: 'AUTH/SIGN_OUT' }),
  }
}

export default inject(mapStore)(AvatarDropdown)
