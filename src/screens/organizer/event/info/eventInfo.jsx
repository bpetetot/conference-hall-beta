import React from 'react'
import PropTypes from 'prop-types'

import EventMaps from './eventMaps'

const EventInfo = ({
  name, description, address, website,
}) => (
  <div>
    <h1>{name}</h1>
    <small>{website}</small>
    <p>{description}</p>
    <address>{address}</address>
    <EventMaps address={address} />
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
