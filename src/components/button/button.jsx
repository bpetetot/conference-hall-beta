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
  round,
  error,
  block,
  href,
  simple,
  children,
  onClick,
  ...rest
}) => {
  const classes = cn(
    'cc-button',
    {
      'cc-button-block': block,
      'cc-button-small': size === 'small',
      'cc-button-large': size === 'large',
      'cc-button-accent': accent,
      'cc-button-round': round,
      'cc-button-error': error,
      'cc-button-primary': primary && !secondary && !tertiary,
      'cc-button-secondary': secondary,
      'cc-button-tertiary': tertiary,
      'cc-button-simple': simple,
    },
    className,
  )

  if (typeof children === 'function') {
    return children(classes)
  }

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  block: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  tertiary: PropTypes.bool,
  size: PropTypes.oneOf(['normal', 'small', 'large']),
  accent: PropTypes.bool,
  round: PropTypes.bool,
  error: PropTypes.bool,
  simple: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

Button.defaultProps = {
  primary: true,
  secondary: false,
  tertiary: false,
  size: 'normal',
  accent: false,
  round: false,
  error: false,
  simple: false,
  href: undefined,
  onClick: undefined,
  block: false,
  className: undefined,
}

export default Button
