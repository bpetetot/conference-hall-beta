import React from 'react'
import PropTypes from 'prop-types'

import { SideBar, SideBarPanel, SideBarLink } from 'layout/sidebar'
import IconLabel from 'components/iconLabel'
import EventSideBar from './event'

const OrganizerSideBar = ({ fullname, className }) => (
  <SideBar className={className}>
    <SideBarPanel label={fullname}>
      <SideBarLink code="ORGANIZER_PROFILE">
        <IconLabel icon="fa fa-user-o" label="Profile" />
      </SideBarLink>
      <SideBarLink code="ORGANIZER">
        <IconLabel icon="fa fa-calendar-o" label="My events" />
      </SideBarLink>
      <SideBarLink code="HOME_ORGANIZATION">
        <IconLabel icon="fa fa-users" label="My organizations" />
      </SideBarLink>
    </SideBarPanel>
    <EventSideBar />
  </SideBar>
)

OrganizerSideBar.propTypes = {
  fullname: PropTypes.string,
  className: PropTypes.string,
}

OrganizerSideBar.defaultProps = {
  fullname: undefined,
  className: undefined,
}

export default OrganizerSideBar
