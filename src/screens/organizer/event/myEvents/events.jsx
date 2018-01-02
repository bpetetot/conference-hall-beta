import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import EventCard from './eventCard'
import './events.css'

const MyEvents = ({ events }) => (
  <div className="events-page">
    <Titlebar className="events-header" icon="fa fa-calendar-o" title="My events">
      <Link href="/organizer/event/create" className="btn btn-primary btn-create-event">
        <IconLabel icon="fa fa-calendar-plus-o" label="Create event" />
      </Link>
    </Titlebar>
    <div className="events-content card">
      {events.length === 0 && (
        <div className="no-events">
          <small>No event yet !</small>
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
