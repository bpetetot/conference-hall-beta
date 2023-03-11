import React from 'react'
import PropTypes from 'prop-types'

import { SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import SubmitTalksLink from 'features/talk/submitTalksLink'

function EventSidebar({ eventId, name, surveyActive }) {
  if (!eventId) return null
  return (
    <SideBarPanel label={name}>
      <SideBarLink to={`/speaker/event/${eventId}`} exact>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SideBarLink to={`/speaker/event/${eventId}/submissions`} exact>
        <IconLabel icon="fa fa-inbox" label="My submissions" />
      </SideBarLink>
      {surveyActive && (
        <SideBarLink to={`/speaker/event/${eventId}/survey`} exact>
          <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
        </SideBarLink>
      )}
      <SubmitTalksLink
        eventId={eventId}
        className="sidebar-button"
        classNameActive="sidebar-link-active"
      />
    </SideBarPanel>
  )
}

EventSidebar.propTypes = {
  eventId: PropTypes.string,
  name: PropTypes.string,
  surveyActive: PropTypes.bool,
}

EventSidebar.defaultProps = {
  eventId: undefined,
  name: 'no name',
  surveyActive: false,
}

export default EventSidebar
