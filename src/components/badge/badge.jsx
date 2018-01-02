import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({
  children, pill, className, style, ...rest
}) => {
  const classes = cn('badge', 'badge-default', { 'badge-pill': pill }, className)
  return (
    <span className={classes} style={style} {...rest}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  pill: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
}

Badge.defaultProps = {
  className: undefined,
  pill: false,
  style: {},
}

export default Badge
