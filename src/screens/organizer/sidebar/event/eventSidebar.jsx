import React from 'react'
import PropTypes from 'prop-types'

import IconLabel from 'components/iconLabel'
import { SideBarPanel, SideBarLink } from 'components/sidebar'

const EventSidebar = ({ id, name }) => {
  if (!id) return null
  return (
    <SideBarPanel label={name}>
      <SideBarLink to={`/organizer/event/${id}`}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SideBarLink to={`/organizer/event/${id}/edit`}>
        <IconLabel icon="fa fa-gear" label="Configuration" />
      </SideBarLink>
      <SideBarLink to={`/organizer/event/${id}/proposals`}>
        <IconLabel icon="fa fa-paper-plane" label="Call for paper" />
      </SideBarLink>
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
