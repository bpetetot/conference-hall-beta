import React from 'react'
import PropTypes from 'prop-types'

import { SideBar, SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import { useAuth } from 'features/auth'
import EventSideBar from './eventSidebar'

const OrganizerSideBar = ({ className }) => {
  const { user } = useAuth()

  return (
    <SideBar className={className}>
      <SideBarPanel label={user.name}>
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
