/* eslint-disable react/jsx-filename-extension,react/prop-types */
import React from 'react'
import { inject } from '@k-ramel/react'

import LoadingIndicator from 'components/loader/loading'

const hasAccessEvent = (uid, event, organization) => {
  if (!event) return false
  if (event.owner === uid) return true
  return organization && organization.members && organization.members[uid]
}

export default (Component) => {
  const AuthorizedEventComponent = ({ canAccess, isEventPage, ...rest }) => {
    if (isEventPage && !canAccess) return <LoadingIndicator />
    return <Component {...rest} />
  }

  return inject((store, props, { router }) => {
    const eventId = router.getParam('eventId')
    const isEventPage = router.getParam('isEventPage')
    const { uid } = store.auth.get()
    const event = store.data.events.get(eventId)
    let organization = null
    if (event && event.organization) {
      organization = store.data.organizations.get(event.organization)
    }

    return {
      isEventPage,
      canAccess: hasAccessEvent(uid, event, organization),
    }
  })(AuthorizedEventComponent)
}
