import { inject } from '@k-ramel/react'

import InvitePage from './invitePage'

const mapStore = (store, props, { router }) => {
  const entity = router.getParam('entity')
  const inviteId = router.getParam('inviteId')

  return {
    entity,
    inviteId,
    push: router.push,
  }
}

export default inject(mapStore)(InvitePage)
