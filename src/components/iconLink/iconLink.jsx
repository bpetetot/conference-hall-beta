import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from '../iconLabel'
import './iconLink.css'

const IconLink = ({
  icon, label, href, target, className, ...rest
}) => {
  if (!label || !href) return null
  return (
    <a href={href} target={target} className={cn('icon-link', className)} {...rest}>
      <IconLabel icon={icon} label={label} />
    </a>
  )
}

IconLink.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  target: PropTypes.string,
}

IconLink.defaultProps = {
  href: undefined,
  className: undefined,
  label: undefined,
  target: 'NEW',
}

export default IconLink
