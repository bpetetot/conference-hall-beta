import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({ children, pill, className, style }) => {
  if (!children) return null

  const classes = cn(
    'cc-badge',
    'cc-badge-default',
    { 'cc-badge-pill': pill },
    className
  )
  return (
    <span className={classes} style={style}>
      {children
    }</span>
  )
}

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  pill: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Badge.defaultProps = {
  children: undefined,
  pill: false,
  className: undefined,
  style: undefined,
}

export default Badge
