import { inject } from '@k-ramel/react'

import InvitePage from './invitePage'

const mapStore = (store, props, { router }) => {
  const entity = router.getParam('entity')
  const inviteId = router.getParam('inviteId')

  return {
    entity,
    inviteId,
    invite: () => store.dispatch({ type: '@@ui/GO_TO_EVENT_SUBMISSION', payload: { inviteId } }),
  }
}

export default inject(mapStore)(InvitePage)
