import React from 'react'

import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'
import { SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import HasRole from 'features/organization/hasRole'
import { useCurrentEvent } from 'features/event/currentEventContext'

const EventSidebar = () => {
  const { data: event } = useCurrentEvent()

  if (!event) return null

  return (
    <SideBarPanel label={event.name}>
      <SideBarLink to={`/organizer/event/${event.id}`} exact>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <HasRole of={ROLE_OWNER_OR_MEMBER}>
        <SideBarLink to={`/organizer/event/${event.id}/edit`}>
          <IconLabel icon="fa fa-gear" label="Configuration" />
        </SideBarLink>
      </HasRole>
      <SideBarLink to={`/organizer/event/${event.id}/proposals`} exact>
        <IconLabel icon="fa fa-paper-plane" label="Proposals" />
      </SideBarLink>
    </SideBarPanel>
  )
}

export default EventSidebar
