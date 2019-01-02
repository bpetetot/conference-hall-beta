import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from '../iconLabel'
import './titlebar.css'

const Titlebar = ({
  icon, title, children, className,
}) => (
  <div className={cn('titlebar', className)}>
    <span className="titlebar-title">
      <IconLabel icon={icon} label={title} overflow />
    </span>
    {children && <div className="titlebar-actions">{children}</div>}
  </div>
)

Titlebar.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  className: PropTypes.string,
}

Titlebar.defaultProps = {
  icon: undefined,
  title: undefined,
  children: undefined,
  className: undefined,
}

export default Titlebar
