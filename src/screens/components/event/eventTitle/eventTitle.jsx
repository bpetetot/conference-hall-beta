import React from 'react'
import PropTypes from 'prop-types'

import './eventTitle.css'

const EventTitle = ({ name, className }) => (
  <h1 className={className}>
    <span className="event-title">{name}</span> • Call for paper
  </h1>
)

EventTitle.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EventTitle.defaultProps = {
  className: undefined,
}

export default EventTitle
