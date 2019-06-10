import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@k-redux-router/react-k-ramel'

import EventDates from 'screens/components/eventDates'
import CfpBadge from 'screens/components/event/cfpBadge'

import styles from './eventCard.module.css'

const EventCard = ({
  objectID,
  name,
  type,
  cfpDates,
  bannerUrl,
  address,
  conferenceDates,
  cfpOpened,
}) => {
  const bannerStyle = bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : {}

  return (
    <Link code="public-event" eventId={objectID} className={styles.wrapper}>
      <div className={styles.banner} style={bannerStyle} />
      <div className={styles.info}>
        <div className={styles.name}>{name}</div>
        <div className={styles.legend}>
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
        <div className={styles.badges}>
          <CfpBadge type={type} cfpDates={cfpDates} cfpOpened={cfpOpened} />
        </div>
      </div>
    </Link>
  )
}

EventCard.propTypes = {
  objectID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  bannerUrl: PropTypes.string,
  address: PropTypes.object,
  conferenceDates: PropTypes.object,
  cfpDates: PropTypes.objectOf(PropTypes.any),
  cfpOpened: PropTypes.bool,
}

EventCard.defaultProps = {
  address: undefined,
  bannerUrl: undefined,
  conferenceDates: undefined,
  cfpDates: {},
  cfpOpened: false,
}

export default EventCard
