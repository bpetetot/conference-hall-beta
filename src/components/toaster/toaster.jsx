import React from 'react'
import PropTypes from 'prop-types'

import './toaster.css'

const Toaster = ({ toasts }) => {
  if (!toasts.length === 0) return null
  return (
    <div className="toaster">{toasts.map(({ code, label }) => <div key={code}>{label}</div>)}</div>
  )
}

Toaster.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.any).isRequired,
}

export default Toaster
