import { inject } from '@k-ramel/react'

import InviteLink from './inviteLink'

const mapStore = store => {
  const { uid } = store.auth.get()
  return {
    uid,
  }
}

export default inject(mapStore)(InviteLink)
