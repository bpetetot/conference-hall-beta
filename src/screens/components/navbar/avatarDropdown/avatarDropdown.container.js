import { inject } from 'k-ramel/react'

import { getUser } from 'redux/auth'
import AvatarDropdown from './avatarDropdown'

const mapStore = (store) => {
  const { displayName, photoURL } = getUser(store)
  return {
    displayName,
    photoURL,
    signout: () => store.dispatch({ type: 'AUTH/SIGN_OUT' }),
  }
}

export default inject(mapStore)(AvatarDropdown)
