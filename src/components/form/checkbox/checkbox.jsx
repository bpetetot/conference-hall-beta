import React from 'react'
import PropTypes from 'prop-types'

import './checkbox.css'

const Checkbox = ({
  name, value, children, ...rest
}) => (
  <div className="form-checkbox">
    <input
      name={name}
      id={`${name}-${value}`}
      type="checkbox"
      value
      defaultChecked={value === true}
      {...rest}
    />
    <label htmlFor={`${name}-${value}`}>{children}</label>
  </div>
)

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
  children: PropTypes.node.isRequired,
}

export default Checkbox
