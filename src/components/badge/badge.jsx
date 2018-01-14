import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({ children, className }) => {
  if (!children) return null
  return <span className={cn('badge', 'badge-default', className)}>{children}</span>
}

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  className: PropTypes.string,
}

Badge.defaultProps = {
  children: undefined,
  className: undefined,
}

export default Badge
