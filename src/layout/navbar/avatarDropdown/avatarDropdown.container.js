import { inject } from '@k-ramel/react'
import { isSpeakerRoute, isOrganizerRoute } from 'store/drivers/router'

import AvatarDropdown from './avatarDropdown'

const mapStore = (store) => {
  const { uid } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uid) || {}

  let contributorsRoute = 'public-contributors'
  if (isSpeakerRoute(store.getState())) {
    contributorsRoute = 'speaker-contributors'
  } else if (isOrganizerRoute(store.getState())) {
    contributorsRoute = 'organizer-contributors'
  }

  return {
    displayName,
    photoURL,
    contributorsRoute,
    signout: () => store.dispatch('@@ui/SIGN_OUT'),
  }
}

export default inject(mapStore)(AvatarDropdown)
