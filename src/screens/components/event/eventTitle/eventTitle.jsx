import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'

import './eventTitle.css'

const EventTitle = ({
  name, type, subtitle, className,
}) => (
  <h1 className={cn('event-title', className)}>
    <div>
      <span className="event-name">{name}</span> • {subtitle}
    </div>
    <Badge pill outline className="event-type">
      {type}
    </Badge>
  </h1>
)

EventTitle.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  className: PropTypes.string,
}

EventTitle.defaultProps = {
  className: undefined,
}

export default EventTitle
