import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import EventCard from './eventCard'
import './events.css'

const MyEvents = ({ events }) => (
  <div>
    <div className="events-header card">
      <h2>
        <IconLabel icon="fa fa-calendar-o" label="My events" />
      </h2>
      <Link href="/organizer/event/create" className="btn btn-primary btn-create-event">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
      </Link>
    </div>
    <div className="events-content card">
      {events.length === 0 && (
        <div className="no-events">
          <h3>No event yet !</h3>
        </div>
      )}
      {events.map(id => <EventCard key={id} id={id} />)}
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
