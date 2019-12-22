import { inject } from '@k-ramel/react'

import RemoveMember from './removeMember'

const mapStore = (store, { user, organizationId }) => {
  return {
    onLeaveMember: () => {
      store.dispatch({
        type: '@@ui/REMOVE_ORGANIZATION_MEMBER',
        payload: { uid: user.uid, organizationId, leave: true },
      })
    },
    onRemoveMember: () => {
      store.dispatch({
        type: '@@ui/REMOVE_ORGANIZATION_MEMBER',
        payload: { uid: user.uid, organizationId },
      })
    },
  }
}

export default inject(mapStore)(RemoveMember)
