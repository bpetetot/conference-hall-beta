import React from 'react'
import PropTypes from 'prop-types'

import './toggle.css'

const Toggle = ({ name, ...rest }) => (
  <label className="toggle" htmlFor={name}>
    <input id={name} name={name} type="checkbox" {...rest} defaultChecked={rest.value} />
    <span className="toggle-item" />
  </label>
)

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.bool,
}

Toggle.defaultProps = {
  value: undefined,
}

export default Toggle
