import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './badge.css'

const Badge = ({
  children,
  pill,
  primary,
  secondary,
  success,
  warning,
  error,
  info,
  dark,
  light,
  className,
  style
}) => {
  if (!children) return null

  const classes = cn(
    'cc-badge',
    {
      'cc-badge-pill': pill,
      'cc-badge-primary': primary,
      'cc-badge-secondary': secondary,
      'cc-badge-success': success,
      'cc-badge-warning': warning,
      'cc-badge-error': error,
      'cc-badge-info': info,
      'cc-badge-dark': dark,
      'cc-badge-light': light,
    },
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
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  error: PropTypes.bool,
  info: PropTypes.bool,
  dark: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

Badge.defaultProps = {
  children: undefined,
  pill: false,
  primary: true,
  secondary: false,
  success: false,
  warning: false,
  error: false,
  info: false,
  dark: false,
  light: false,
  className: undefined,
  style: undefined,
}

export default Badge
