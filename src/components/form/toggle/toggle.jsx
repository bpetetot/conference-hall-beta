import React from 'react'
import PropTypes from 'prop-types'

import './toggle.css'

const Toggle = ({ name, ...rest }) => (
  <label className="toggle" htmlFor={name}>
    <input name={name} type="checkbox" id={name} {...rest} checked={rest.value} />
    <span className="toggle-item" />
  </label>
)

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
}

Toggle.defaultProps = {
  value: false,
}

export default Toggle
