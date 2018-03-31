import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import InviteOrganizer from './inviteOrganizer'

const mapStore = (store, ownProps, { router }) => {
  const organizationId = router.getRouterParam('organizationId')(store.getState())
  const uidInvite = router.getRouterParam('uid')(store.getState())
  const { uid } = store.auth.get()
  const { displayName, photoURL } = store.data.users.get(uid) || {}
  const { name } = store.data.organizations.get(organizationId) || {}

  return {
    loaded: store.data.organizations.hasKey(organizationId) && store.data.users.hasKey(uidInvite),
    name,
    displayName,
    photoURL,
    uidInvite,
    load: () => {
      store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZATION', payload: organizationId })
      store.dispatch({ type: '@@ui/FETCH_USER', payload: uidInvite })
      store.dispatch({ type: '@@ui/FETCH_USER', payload: uid })
    },
    join: () => {
      store.dispatch({ type: '@@ui/ADD_ORGANIZATION_TO_USER', payload: { uid, organizationId } })
      router.push(`/organizer/organizations/${organizationId}`)
    },
    cancel: () => router.push('/organizer'),
  }
}

export default compose(
  forRoute.absolute('INVITE_ORGANIZER'), //
  inject(mapStore), //
  loader, //
)(InviteOrganizer)
