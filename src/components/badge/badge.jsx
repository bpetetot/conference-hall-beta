import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({ children, pill, className }) => {
  if (!children) return null

  const classes = cn(
    'cc-badge',
    'cc-badge-default',
    { 'cc-badge-pill': pill },
    className
  )
  return (
    <span className={classes}>
      {children
    }</span>
  )
}

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  pill: PropTypes.bool,
  className: PropTypes.string,
}

Badge.defaultProps = {
  children: undefined,
  pill: false,
  className: undefined,
}

export default Badge
