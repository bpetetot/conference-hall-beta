import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { SideBar, SideBarPanel, SideBarLink } from 'components/sidebar'

const SpeakerSideBar = ({ fullname, className }) => (
  <SideBar className={className}>
    <SideBarPanel label={fullname}>
      <SideBarLink to="/speaker/profile">
        <IconLabel icon="fa fa-user-o" label="Profile" />
      </SideBarLink>
    </SideBarPanel>
  </SideBar>
)

SpeakerSideBar.propTypes = {
  fullname: PropTypes.string,
  className: PropTypes.string,
}

SpeakerSideBar.defaultProps = {
  fullname: undefined,
  className: undefined,
}

export default SpeakerSideBar
