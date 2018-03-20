import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { SideBarPanel, SideBarLink } from 'components/sidebar'

const EventSidebar = ({ eventId, name }) => {
  if (!eventId) return null
  return (
    <SideBarPanel label={name}>
      <SideBarLink to={`/organizer/event/${eventId}`}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SideBarLink to={`/organizer/event/${eventId}/edit`}>
        <IconLabel icon="fa fa-gear" label="Configuration" />
      </SideBarLink>
      <SideBarLink to={`/organizer/event/${eventId}/proposals`}>
        <IconLabel icon="fa fa-paper-plane" label="Proposals" />
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
