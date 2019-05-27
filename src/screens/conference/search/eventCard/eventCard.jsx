import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import EventDates from 'screens/components/eventDates'

import styles from './eventCard.module.css'

const EventCard = ({
  id, name, type, address, conferenceDates,
}) => (
  <div className={styles.card}>
    <Link code="speaker-event-page" eventId={id}>
      <div className={styles.image} />
      <div className={styles.legend}>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.address}>
            {address && address.locality && <span>{address.locality.long_name}, </span>}
            {address && address.country && <span>{address.country.long_name}</span>}
          </div>
          {type === 'conference' && (
          <div className={styles.dates}>
            <EventDates dates={conferenceDates} noIcon />
          </div>
          )}
        </div>
      </div>
    </Link>
  </div>
)

EventCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  address: PropTypes.string,
  conferenceDates: PropTypes.object,
}

EventCard.defaultProps = {
  address: undefined,
  conferenceDates: undefined,
}

export default EventCard
