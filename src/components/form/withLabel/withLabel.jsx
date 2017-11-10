/* eslint-disable react/prop-types */
import React from 'react'

import './label.css'

const withLabel = Component => ({ name, label, ...rest }) => (
  <div className="form-label">
    <label htmlFor={name}>{label}</label>
    <Component name={name} {...rest} />
  </div>
)

export default withLabel
