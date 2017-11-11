import React from 'react'
import PropTypes from 'prop-types'

import EventMap from '../../../../components/maps'
import IconLabel from '../../../../components/iconLabel'
import './eventInfo.css'

const EventInfo = ({
  name, description, address, website,
}) => (
  <div className="event-info">
    <div className="event-data">
      <h1>{name}</h1>
      {website && (
        <p>
          <a href={website} target="NEW">
            <IconLabel icon="fa fa-globe" label="Website" />
          </a>
        </p>
      )}
      {address && (
        <p>
          <a href={`https://www.google.com/maps/place/${encodeURI(address)}`} target="NEW">
            <IconLabel icon="fa fa-map-marker" label={address} />
          </a>
        </p>
      )}
      <p>{description}</p>
    </div>
    <div className="event-map">
      <EventMap address={address} />
    </div>
  </div>
)

EventInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string,
  website: PropTypes.string,
}

EventInfo.defaultProps = {
  address: undefined,
  website: undefined,
}

export default EventInfo
