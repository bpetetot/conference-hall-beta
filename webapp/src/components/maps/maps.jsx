import React from 'react'
import PropTypes from 'prop-types'

import './maps.css'

const API_KEY = process.env.REACT_APP_API_KEY

const Maps = ({ address, ...rest }) => {
  if (!address) return null
  return (
    <iframe
      title="maps"
      className="maps"
      {...rest}
      frameBorder="0"
      src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURI(address)}`}
      allowFullScreen
    />
  )
}

Maps.propTypes = {
  address: PropTypes.string,
}

Maps.defaultProps = {
  address: undefined,
}

export default Maps
