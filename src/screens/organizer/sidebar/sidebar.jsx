import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { SideBar, SideBarPanel, SideBarLink } from 'components/sidebar'
import EventSideBar from './eventSidebar'

const OrganizerSideBar = ({ fullname, className }) => (
  <SideBar className={className}>
    <SideBarPanel label={fullname}>
      <SideBarLink to="/organizer">
        <IconLabel icon="fa fa-calendar-o" label="My events" />
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
  fullname: 'Organizer',
  className: undefined,
}

export default OrganizerSideBar
