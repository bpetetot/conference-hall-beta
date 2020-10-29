import React from 'react'
import PropTypes from 'prop-types'

import { useCurrentEventId } from 'features/event/currentEventContext'
import { SideBar, SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import { useAuth } from 'features/auth'
import EventSideBar from './event'

const OrganizerSideBar = ({ className }) => {
  const { user } = useAuth()
  const eventId = useCurrentEventId()
  return (
    <SideBar className={className}>
      <SideBarPanel label={user.displayName}>
        <SideBarLink to="/organizer/profile" exact>
          <IconLabel icon="fa fa-user-o" label="Profile" />
        </SideBarLink>
        <SideBarLink to="/organizer" exact>
          <IconLabel icon="fa fa-calendar-o" label="My events" />
        </SideBarLink>
        <SideBarLink to="/organizer/organizations" exact>
          <IconLabel icon="fa fa-users" label="My organizations" />
        </SideBarLink>
      </SideBarPanel>
      <EventSideBar eventId={eventId} />
    </SideBar>
  )
}

OrganizerSideBar.propTypes = {
  className: PropTypes.string,
}

OrganizerSideBar.defaultProps = {
  className: undefined,
}

export default OrganizerSideBar
