import React from 'react'
import PropTypes from 'prop-types'

import { useAuth } from 'features/auth'
import { SideBar, SideBarPanel, SideBarLink } from 'layout/sidebar'
import IconLabel from 'components/iconLabel'
import EventSidebar from './event'

const SpeakerSideBar = ({ className }) => {
  const { user } = useAuth()

  return (
    <SideBar className={className}>
      <SideBarPanel label={user.displayName}>
        <SideBarLink to="/speaker/profile" exact>
          <IconLabel icon="fa fa-user-o" label="Profile" />
        </SideBarLink>
        <SideBarLink to="/speaker" exact>
          <IconLabel icon="fa fa-microphone" label="My talks" />
        </SideBarLink>
      </SideBarPanel>
      <EventSidebar />
    </SideBar>
  )
}
SpeakerSideBar.propTypes = {
  className: PropTypes.string,
}

SpeakerSideBar.defaultProps = {
  className: undefined,
}

export default SpeakerSideBar
