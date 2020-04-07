import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconWrapper.css'

const iconWrapper = (Icon) => {
  const Wrapper = ({ className, medium, large, ...rest }) => {
    const classes = cn(
      'cc-icon cc-icon-small',
      {
        'cc-icon-medium': medium,
        'cc-icon-large': large,
      },
      className,
    )

    return <Icon className={classes} {...rest} />
  }

  Wrapper.propTypes = {
    className: PropTypes.string,
    medium: PropTypes.bool,
    large: PropTypes.bool,
  }

  Wrapper.defaultProps = {
    className: undefined,
    medium: undefined,
    large: undefined,
  }

  return Wrapper
}

export default iconWrapper
