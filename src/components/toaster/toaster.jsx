import React from 'react'
import PropTypes from 'prop-types'

import Toast from './toast'
import './toaster.css'

const Toaster = ({ toasts }) => {
  if (!toasts.length === 0) return null
  return (
    <div className="toaster">
      {toasts.map(({ code, ...rest }) => <Toast key={code} {...rest} />)}
    </div>
  )
}

Toaster.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default Toaster
