import { inject } from '@k-ramel/react'

import AvatarDropdown from './avatarDropdown'

const mapStore = (store, props, { router }) => {
  let contributorsRoute = 'public-contributors'
  if (router.getParam('root') === 'speaker') {
    contributorsRoute = 'speaker-contributors'
  } else if (router.getParam('root') === 'organizer') {
    contributorsRoute = 'organizer-contributors'
  }

  return { contributorsRoute }
}

export default inject(mapStore)(AvatarDropdown)
