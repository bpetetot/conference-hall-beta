import React from 'react'
import PropTypes from 'prop-types'

import { SideBar, SideBarPanel, SideBarLink } from 'layout/sidebar'
import IconLabel from 'components/iconLabel'
import { useAuth } from 'features/auth'
import EventSideBar from './event'

const OrganizerSideBar = ({ className }) => {
  const { user } = useAuth()
  return (
    <SideBar className={className}>
      <SideBarPanel label={user.displayName}>
        <SideBarLink to="/organizer/profile">
          <IconLabel icon="fa fa-user-o" label="Profile" />
        </SideBarLink>
        <SideBarLink to="/organizer/events">
          <IconLabel icon="fa fa-calendar-o" label="My events" />
        </SideBarLink>
        <SideBarLink to="/organizer/organizations">
          <IconLabel icon="fa fa-users" label="My organizations" />
        </SideBarLink>
      </SideBarPanel>
      <EventSideBar />
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
