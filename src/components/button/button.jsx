import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './button.css'

const Button = ({
  className,
  primary,
  secondary,
  tertiary,
  size,
  accent,
  error,
  block,
  href,
  simple,
  children,
  ...rest
}) => {
  const classes = cn(
    'cc-button',
    {
      'cc-button-block': block,
      'cc-button-small': size === 'small',
      'cc-button-large': size === 'large',
      'cc-button-accent': accent,
      'cc-button-error': error,
      'cc-button-primary': primary && !secondary && !tertiary,
      'cc-button-secondary': secondary,
      'cc-button-tertiary': tertiary,
      'cc-button-simple': simple,
    },
    className,
  )

  if (href) {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small', 'large']),
  accent: PropTypes.bool,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  href: PropTypes.string,
  className: PropTypes.string,
}

Button.defaultProps = {
  primary: true,
  secondary: false,
  tertiary: false,
  size: 'normal',
  accent: false,
  error: false,
  simple: false,
  href: undefined,
  block: false,
  className: undefined,
}

export default Button
