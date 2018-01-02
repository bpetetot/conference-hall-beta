import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({ children, className }) => (
  <span className={cn('badge', 'badge-default', className)}>{children}</span>
)

Badge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  className: PropTypes.string,
}

Badge.defaultProps = {
  className: undefined,
}

export default Badge
