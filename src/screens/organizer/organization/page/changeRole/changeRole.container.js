import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import ChangeRole from './changeRole'

const mapStore = (store, { uid, organizationId }) => {
  const user = store.data.users.get(uid)
  const { uid: userId } = store.auth.get()

  return {
    displayName: user?.displayName,
    isAuthenticatedUser: userId === uid,
    changeMemberRole: role =>
      store.dispatch({
        type: '@@ui/CHANGE_ORGANIZATION_MEMBER_ROLE',
        payload: { uid, role, organizationId },
      }),
  }
}

export default compose(inject(mapStore))(ChangeRole)
