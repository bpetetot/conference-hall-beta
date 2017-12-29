import React from 'react'
import PropTypes from 'prop-types'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import IconLabel from 'components/iconLabel'

import './eventCard.css'

const EventCard = ({ name, createTimestamp, goToEvent }) => {
  const relativeDate = distanceInWordsToNow(createTimestamp, { addSuffix: true })
  return (
    <div className="event-card" onClick={goToEvent} role="button">
      <span className="event-card-title">{name}</span>
      <small>
        <IconLabel icon="fa fa-clock-o" label={relativeDate} />
      </small>
    </div>
  )
}

EventCard.propTypes = {
  name: PropTypes.string.isRequired,
  createTimestamp: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  goToEvent: PropTypes.func.isRequired,
}

export default EventCard
