import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import IconLabel from 'components/iconLabel'
import './eventTabs.css'

const EventTabs = ({ eventId }) => (
  <ul className="event-tabs tabs card">
    <li>
      <Link code="EDIT_EVENT" eventId={eventId}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event" />
      </Link>
    </li>
    <li>
      <Link code="EDIT_EVENT_CFP" eventId={eventId}>
        <IconLabel icon="fa fa-gear" label="CFP Settings" />
      </Link>
    </li>
    <li>
      <Link code="EDIT_EVENT_DELIBERATION" eventId={eventId}>
        <IconLabel icon="fa fa-check-square-o" label="Deliberation" />
      </Link>
    </li>
    <li>
      <Link code="EDIT_EVENT_SURVEY" eventId={eventId}>
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Link>
    </li>
    <li>
      <Link code="EDIT_EVENT_API" eventId={eventId}>
        <IconLabel icon="fa fa-rocket" label="API" />
      </Link>
    </li>
  </ul>
)

EventTabs.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventTabs
