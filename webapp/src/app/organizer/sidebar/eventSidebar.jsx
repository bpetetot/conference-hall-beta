import React from 'react'
import { useMatch } from 'react-router'

import { SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import HasRole from 'features/organization/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { useOrganizerEvent } from '../../../data/event'

const EventSidebar = () => {
  const match = useMatch('/organizer/event/:eventId/*')
  const eventId = parseInt(match?.params?.eventId, 10)
  const { data: event } = useOrganizerEvent(eventId)

  if (!event) return null
  return (
    <SideBarPanel label={event.name}>
      <SideBarLink to={`/organizer/event/${eventId}`} exact>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEvent={event}>
        <SideBarLink to={`/organizer/event/${eventId}/edit`}>
          <IconLabel icon="fa fa-gear" label="Configuration" />
        </SideBarLink>
      </HasRole>
      <SideBarLink to={`/organizer/event/${eventId}/proposals`} exact>
        <IconLabel icon="fa fa-paper-plane" label="Proposals" />
      </SideBarLink>
    </SideBarPanel>
  )
}

export default EventSidebar
