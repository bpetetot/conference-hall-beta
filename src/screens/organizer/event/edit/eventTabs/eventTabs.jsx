import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import './eventTabs.css'

const EventTabs = ({ eventId }) => (
  <ul className="event-tabs tabs card">
    <li>
      <Link href={`/organizer/event/${eventId}/edit`} activeProps={{ className: 'tab-active' }}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event" />
      </Link>
    </li>
    <li>
      <Link href={`/organizer/event/${eventId}/edit/cfp`} activeProps={{ className: 'tab-active' }}>
        <IconLabel icon="fa fa-gear" label="CFP Settings" />
      </Link>
    </li>
    <li>
      <Link
        href={`/organizer/event/${eventId}/edit/deliberation`}
        activeProps={{ className: 'tab-active' }}
      >
        <IconLabel icon="fa fa-check-square-o" label="Deliberation" />
      </Link>
    </li>
    <li>
      <Link
        href={`/organizer/event/${eventId}/edit/survey`}
        activeProps={{ className: 'tab-active' }}
      >
        <IconLabel icon="fa fa-question-circle" label="Speaker survey" />
      </Link>
    </li>
    <li>
      <Link
        href={`/organizer/event/${eventId}/edit/api`}
        activeProps={{ className: 'tab-active' }}
      >
        <IconLabel icon="fa fa-rocket" label="API" />
      </Link>
    </li>
  </ul>
)

EventTabs.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventTabs
