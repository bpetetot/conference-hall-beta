import { inject } from '@k-ramel/react'

import { getBaseRoute } from 'store/reducers/router'
import AvatarDropdown from './avatarDropdown'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uid) || {}
  const baseRoute = getBaseRoute(store.getState())
  return {
    baseRoute,
    displayName,
    photoURL,
    signout: () => store.dispatch('@@ui/SIGN_OUT'),
  }
}

export default inject(mapStore)(AvatarDropdown)
