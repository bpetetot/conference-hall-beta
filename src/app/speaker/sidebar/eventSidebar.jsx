import React from 'react'

import { SideBarPanel, SideBarLink } from 'app/layout/sidebar'
import IconLabel from 'components/iconLabel'
import SubmitTalksLink from 'features/talk/components/submitTalksLink'
import { useCurrentEvent } from 'features/event/currentEventContext'

const EventSidebar = () => {
  const { data: event } = useCurrentEvent()

  if (!event) return null

  return (
    <SideBarPanel label={event.name}>
      <SideBarLink to={`/speaker/event/${event.id}`} exact>
        <IconLabel icon="fa fa-calendar-check-o" label="Event profile" />
      </SideBarLink>
      <SideBarLink to={`/speaker/event/${event.id}/submissions`} exact>
        <IconLabel icon="fa fa-inbox" label="My submissions" />
      </SideBarLink>
      {event.surveyActive && (
        <SideBarLink to={`/speaker/event/${event.id}/survey`} exact>
          <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
        </SideBarLink>
      )}
      <SubmitTalksLink
        eventId={event.id}
        className="sidebar-link"
        classNameActive="sidebar-link-active"
      />
    </SideBarPanel>
  )
}

export default EventSidebar
