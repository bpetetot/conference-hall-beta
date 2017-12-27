import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import './eventTabs.css'

const EventTabs = ({ id }) => (
  <ul className="event-tabs tabs card">
    <li>
      <Link href={`/organizer/event/${id}/edit`} activeProps={{ className: 'tab-active' }}>
        <IconLabel icon="fa fa-calendar-check-o" label="Event" />
      </Link>
    </li>
    <li>
      <Link href={`/organizer/event/${id}/edit/cfp`} activeProps={{ className: 'tab-active' }}>
        <IconLabel icon="fa fa-gear" label="CFP Settings" />
      </Link>
    </li>
  </ul>
)

EventTabs.propTypes = {
  id: PropTypes.string.isRequired,
}

export default EventTabs
