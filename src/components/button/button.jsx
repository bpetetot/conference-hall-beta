import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './button.css'

const Button = ({
  className,
  type,
  size,
  accent,
  error,
  block,
  icon,
  loading,
  simple,
  children,
  ...rest
}) => {
  const classes = cn(
    'cc-button',
    {
      'cc-button-icon': icon,
      'cc-button-block': block,
      'cc-button-small': size === 'small',
      'cc-button-large': size === 'large',
      'cc-button-accent': accent,
      'cc-button-error': error,
      'cc-button-primary': type === 'primary',
      'cc-button-secondary': type === 'secondary',
      'cc-button-tertiary': type === 'tertiary',
      'cc-button-loading': loading,
      'cc-button-simple': simple,
    },
    className,
  )

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.bool,
  block: PropTypes.bool,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['normal', 'small', 'large']),
  accent: PropTypes.bool,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  simple: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  icon: false,
  block: false,
  type: 'primary',
  size: 'normal',
  accent: false,
  error: false,
  loading: false,
  simple: false,
  className: undefined,
}

export default Button
