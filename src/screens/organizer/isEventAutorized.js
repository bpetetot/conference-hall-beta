/* eslint-disable react/jsx-filename-extension,react/prop-types */
import React from 'react'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'
import LoadingIndicator from 'components/loader/loading'
import { useAuth } from 'features/auth'

const hasAccessEvent = (uid, event, organization) => {
  if (!event) return false
  if (event.owner === uid) return true
  return organization && organization.members && organization.members[uid]
}

export default (Component) => {
  const AuthorizedEventComponent = ({ event, organization, isEventPage, ...rest }) => {
    const { user } = useAuth()
    const canAccess = hasAccessEvent(user.uid, event, organization)
    if (isEventPage && !canAccess) return <LoadingIndicator />
    return <Component {...rest} />
  }

  return inject((store, { userId }, { router }) => {
    const eventId = router.getParam('eventId')
    const isEventPage = router.getParam('isEventPage')
    const event = store.data.events.get(eventId)
    let organization = null
    if (event && event.organization) {
      organization = store.data.organizations.get(event.organization)
    }

    return {
      loaded: store.data.organizations.isInitialized(),
      load: () => {
        store.dispatch('@@ui/ON_LOAD_EVENT')
        store.dispatch({ type: '@@ui/ON_LOAD_USER_ORGANIZATIONS', payload: { userId } })
      },
      isEventPage,
      event,
      organization,
    }
  })(loader(AuthorizedEventComponent))
}
