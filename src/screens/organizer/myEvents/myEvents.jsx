import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import EventCard from './eventCard'
import './myEvents.css'

const MyEvents = ({ events }) => (
  <div className="organizer-events">
    <div className="events-table">
      <div className="events-header">
        <h1>
          <IconLabel icon="fa fa-calendar" label="My events" />
        </h1>
        <Link href="/organizer/event/create" className="btn btn-primary btn-create-event">
          <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
        </Link>
      </div>
      <div className="events-content">
        {events.length === 0 && 'Aucun événement'}
        {events.map(id => <EventCard key={id} id={id} />)}
      </div>
    </div>
  </div>
)

MyEvents.propTypes = {
  events: PropTypes.arrayOf(PropTypes.string),
}

MyEvents.defaultProps = {
  events: [],
}

export default MyEvents
