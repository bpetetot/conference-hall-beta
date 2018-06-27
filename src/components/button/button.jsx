import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './button.css'

const Button = ({
  className, icon, children, ...rest
}) => {
  const classes = cn('cc-button', { 'cc-button-icon': icon }, className)
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  icon: false,
  className: undefined,
}

export default Button
