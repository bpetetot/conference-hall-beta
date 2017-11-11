import React from 'react'
import PropTypes from 'prop-types'

const EventInfo = ({
  name, description, address, city, country, website,
}) => (
  <div>
    <h1>{name}</h1>
    <small>{website}</small>
    <p>{description}</p>
    <p>
      {address}
      <br />
      {city}
      <br />
      {country}
    </p>
  </div>
)

EventInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  website: PropTypes.string,
}

EventInfo.defaultProps = {
  address: undefined,
  city: undefined,
  country: undefined,
  website: undefined,
}

export default EventInfo
