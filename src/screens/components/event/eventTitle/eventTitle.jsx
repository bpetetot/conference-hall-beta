import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './eventTitle.css'

const EventTitle = ({ name, subtitle, className }) => (
  <h1 className={cn('event-title', className)}>
    <span className="event-name">{name}</span> • {subtitle}
  </h1>
)

EventTitle.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EventTitle.defaultProps = {
  className: undefined,
}

export default EventTitle
