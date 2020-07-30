import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import ChangeRole from './changeRole'

const mapStore = (store, { user, organizationId }) => {
  return {
    changeMemberRole: (role) =>
      store.dispatch({
        type: '@@ui/CHANGE_ORGANIZATION_MEMBER_ROLE',
        payload: { uid: user.uid, role, organizationId },
      }),
  }
}

export default compose(inject(mapStore))(ChangeRole)
