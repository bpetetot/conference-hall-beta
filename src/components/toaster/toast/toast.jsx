import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'
import './toast.css'

const Toast = ({ type, label }) => {
  const iconClass = cn('fa fa-2x', {
    'fa-comment': type === 'default',
    'fa-info-circle': type === 'info',
    'fa-exclamation-triangle': type === 'warning',
    'fa-exclamation-circle': type === 'error',
    'fa-question-circle': type === 'question',
    'fa-check-circle': type === 'success',
  })

  return (
    <div className={`toast toast-${type}`}>
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
