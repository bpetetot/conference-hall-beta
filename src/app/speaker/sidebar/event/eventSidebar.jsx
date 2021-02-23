import React from 'react'

import { SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import SubmitTalksLink from 'features/talk/submitTalksLink'
import { useEvent } from 'data/event'
import { useMatch } from 'react-router'

const EventSidebar = () => {
  const match = useMatch('/speaker/event/:eventId/*')
  const eventId = match?.params?.eventId
  const { data: event } = useEvent(eventId)

  if (!event) return null
  return (
    <SideBarPanel label={event.name}>
      <SideBarLink to={`/speaker/event/${eventId}`} exact>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SideBarLink to={`/speaker/event/${eventId}/submissions`} exact>
        <IconLabel icon="fa fa-inbox" label="My submissions" />
      </SideBarLink>
      {event.surveyEnabled && (
        <SideBarLink to={`/speaker/event/${eventId}/survey`} exact>
          <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
        </SideBarLink>
      )}
      <SubmitTalksLink
        eventId={eventId}
        displayed={event.isCfpOpened}
        className="sidebar-button"
        classNameActive="sidebar-link-active"
      />
    </SideBarPanel>
  )
}

export default EventSidebar
