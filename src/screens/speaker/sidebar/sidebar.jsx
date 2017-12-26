import React from 'react'
import PropTypes from 'prop-types'

import { SideBar, SideBarPanel } from 'components/sidebar'

const SpeakerSideBar = ({ fullname, className }) => (
  <SideBar className={className}>
    <SideBarPanel label={fullname}>
      <div>Profile</div>
    </SideBarPanel>
  </SideBar>
)

SpeakerSideBar.propTypes = {
  fullname: PropTypes.string,
  className: PropTypes.string,
}

SpeakerSideBar.defaultProps = {
  fullname: 'Speaker',
  className: undefined,
}

export default SpeakerSideBar
