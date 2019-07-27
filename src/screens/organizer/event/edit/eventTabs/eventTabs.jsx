import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/link'

import IconLabel from 'components/iconLabel'
import './eventTabs.css'

const EventTabs = ({ eventId }) => (
  <ul className="event-tabs tabs card">
    <li>
      <Link code="organizer-event-edit" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-calendar-check-o" label="Event" />
      </Link>
    </li>
    <li>
      <Link code="organizer-event-edit-cfp" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-gear" label="CFP Settings" />
      </Link>
    </li>
    <li>
      <Link code="organizer-event-edit-customize" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-paint-brush" label="Customize" />
      </Link>
    </li>
    <li>
      <Link code="organizer-event-edit-deliberation" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-check-square-o" label="Deliberation" />
      </Link>
    </li>
    <li>
      <Link code="organizer-event-edit-survey" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Link>
    </li>
    <li>
      <Link code="organizer-event-edit-integrations" eventId={eventId} classNameActive="tab-active">
        <IconLabel icon="fa fa-rocket" label="API" />
      </Link>
    </li>
  </ul>
)

EventTabs.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventTabs
