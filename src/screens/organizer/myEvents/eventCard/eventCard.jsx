import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { Link } from 'redux-little-router'

import './eventCard.css'

const EventCard = ({
  id, name, timestamp, goToEvent,
}) => {
  const relativeDate = distanceInWordsToNow(timestamp, { addSuffix: true })
  return (
    <div className="event-card" onClick={goToEvent} role="button">
      <div className="event-header">
        <Link href={`/organizer/event/${id}`}>{name}</Link>
      </div>
      <small>created {relativeDate}</small>
    </div>
  )
}

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  goToEvent: PropTypes.func.isRequired,
}

export default EventCard
