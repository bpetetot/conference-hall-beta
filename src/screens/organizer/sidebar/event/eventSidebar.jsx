import React from 'react'
import PropTypes from 'prop-types'

import { SideBarPanel, SideBarLink } from 'layout/sidebar'
import IconLabel from 'components/iconLabel'
import HasRole from 'screens/components/hasRole'
import { ROLE_OWNER_OR_MEMBER } from 'firebase/constants'

const EventSidebar = ({ eventId, name }) => {
  if (!eventId) return null
  return (
    <SideBarPanel label={name}>
      <SideBarLink code="organizer-event-page" eventId={eventId}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <HasRole of={ROLE_OWNER_OR_MEMBER} forEventId={eventId}>
        <SideBarLink code="organizer-event-edit" eventId={eventId}>
          <IconLabel icon="fa fa-gear" label="Configuration" />
        </SideBarLink>
      </HasRole>
      <SideBarLink code="organizer-event-proposals" eventId={eventId}>
        <IconLabel icon="fa fa-paper-plane" label="Proposals" />
      </SideBarLink>
      <SideBarLink code="organizer-event-agenda" eventId={eventId}>
        <IconLabel icon="fa fa-calendar" label="Agenda" />
      </SideBarLink>
    </SideBarPanel>
  )
}

EventSidebar.propTypes = {
  eventId: PropTypes.string,
  name: PropTypes.string,
}

EventSidebar.defaultProps = {
  eventId: undefined,
  name: 'no name',
}

export default EventSidebar
