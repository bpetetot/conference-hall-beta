import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { SideBarPanel, SideBarLink } from 'components/sidebar'
import SubmitTalksLink from 'screens/components/submitTalksLink'

const EventSidebar = ({ id, name }) => {
  if (!id) return null
  return (
    <SideBarPanel label={name}>
      <SideBarLink to={`/speaker/event/${id}`}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SubmitTalksLink eventId={id} className="sidebar-link" />
    </SideBarPanel>
  )
}

EventSidebar.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
}

EventSidebar.defaultProps = {
  id: undefined,
  name: 'no name',
}

export default EventSidebar
