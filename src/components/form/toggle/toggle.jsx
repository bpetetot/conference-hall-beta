import React from 'react'
import PropTypes from 'prop-types'

import './toggle.css'

const Toggle = ({ name, ...rest }) => (
  <div className="toggle">
    <input name={name} type="checkbox" id={name} {...rest} checked={rest.value} />
    <label htmlFor={name} />
  </div>
)

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Toggle
