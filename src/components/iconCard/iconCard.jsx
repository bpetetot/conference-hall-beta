import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './iconCard.css'

const IconCard = ({
  icon, children, href, className,
}) => {
  const containerClass = cn('icon-card', className)
  const iconClass = cn(icon, 'fa-fw')
  if (href) {
    return (
      <a className={cn(containerClass, 'icon-card-link')} href={href} target="_NEW">
        <i className={iconClass} />
        <div>{children}</div>
      </a>
    )
  }
  return (
    <div className={containerClass}>
      <i className={iconClass} />
      <div>{children}</div>
    </div>
  )
}

IconCard.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
}

IconCard.defaultProps = {
  href: undefined,
  className: undefined,
}

export default IconCard
