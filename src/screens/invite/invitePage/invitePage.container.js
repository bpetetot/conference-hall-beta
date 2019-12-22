import { inject } from '@k-ramel/react'

import InvitePage from './invitePage'

const mapStore = (store, props, { router }) => {
  const inviteId = router.getParam('inviteId')

  return {
    inviteId,
    push: router.push,
  }
}

export default inject(mapStore)(InvitePage)
