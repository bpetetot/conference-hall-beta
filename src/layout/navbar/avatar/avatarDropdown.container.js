import { inject } from '@k-ramel/react'

import AvatarDropdown from './avatarDropdown'

const mapStore = (store, props, { router }) => {
  const { uid, authenticated } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uid) || {}

  let contributorsRoute = 'public-contributors'
  if (router.getParam('root') === 'speaker') {
    contributorsRoute = 'speaker-contributors'
  } else if (router.getParam('root') === 'organizer') {
    contributorsRoute = 'organizer-contributors'
  }

  return {
    authenticated,
    displayName,
    photoURL,
    contributorsRoute,
    signout: () => store.dispatch('@@ui/SIGN_OUT'),
  }
}

export default inject(mapStore)(AvatarDropdown)
