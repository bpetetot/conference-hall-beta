import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './alert.css'

const Alert = ({
  title, type, actionButtons, className,
}) => {
  let icon = 'fa fa-info-circle fa-2x'
  if (type === 'success') {
    icon = 'fa fa-check-circle fa-2x'
  } else if (type === 'error') {
    icon = 'fa fa-exclamation-circle fa-2x'
  } else if (type === 'warning') {
    icon = 'fa fa-exclamation-triangle fa-2x'
  }
  return (
    <div className="alert">
      <span className={cn(className, 'alert-icon',
        { 'alert-icon-info': type === 'info' },
        { 'alert-icon-error': type === 'error' },
        { 'alert-icon-sucess': type === 'success' },
        { 'alert-icon-warning': type === 'warning' })}>
        <span>
          <i className={icon} />
        </span>
      </span>
      <span className="alert-title">
        {title}
      </span>
      <div className="actions">
        {actionButtons}
      </div>
    </div>
  )
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
  actionButtons: PropTypes.object,
  className: PropTypes.string,
}

Alert.defaultProps = {
  className: undefined,
  type: 'info',
  actionButtons: {},
}

export default Alert
