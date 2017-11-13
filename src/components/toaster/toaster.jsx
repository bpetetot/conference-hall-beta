import React from 'react'
import PropTypes from 'prop-types'

import './toaster.css'

const Toaster = ({ toasts }) => {
  if (!toasts.length === 0) return null
  return (
    <div className="toaster">
      {toasts.map(({ id, label, type }) => (
        <div key={id}>
          {label} {type}
        </div>
      ))}
    </div>
  )
}

Toaster.propTypes = {
  toasts: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Toaster
