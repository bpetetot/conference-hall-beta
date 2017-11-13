import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import './toast.css'

const Toast = ({ type, label }) => {
  const iconClass = cn('fa fa-2x', {
    'fa-comment toast-default': type === 'default',
    'fa-info-circle toast-info': type === 'info',
    'fa-exclamation-triangle toast-warning': type === 'warning',
    'fa-exclamation-circle toast-error': type === 'error',
    'fa-question-circle toast-question': type === 'question',
  })

  return (
    <div className="toast">
      <IconLabel icon={iconClass} label={label} />
    </div>
  )
}

Toast.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
}

Toast.defaultProps = {
  type: 'default',
}

export default Toast
