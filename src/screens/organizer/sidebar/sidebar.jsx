import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from '../../../components/iconLabel'
import { SideBar, SideBarPanel, SideBarLink } from '../../../components/sidebar'

const OrganizerSideBar = ({ className }) => (
  <SideBar className={className}>
    <SideBarPanel label="General">
      <SideBarLink to="/organizer">
        <IconLabel icon="fa fa-home" label="Home" />
      </SideBarLink>
    </SideBarPanel>
  </SideBar>
)

OrganizerSideBar.propTypes = {
  className: PropTypes.string,
}

OrganizerSideBar.defaultProps = {
  className: undefined,
}

export default OrganizerSideBar
