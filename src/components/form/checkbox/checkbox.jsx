import React from 'react'
import PropTypes from 'prop-types'

import './checkbox.css'

const Checkbox = (props) => {
  const {
    name, label, value, info,
  } = props
  return (
    <div className="form-checkbox">
      <input
        name={name}
        id={`${name}-${value}`}
        type="checkbox"
        defaultChecked={!!value}
        {...props}
      />
      {(label || info) && (
        <label htmlFor={`${name}-${value}`}>
          {label}
          {info && (
            <div>
              <small>{info}</small>
            </div>
          )}
        </label>
      )}
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
  info: PropTypes.node,
}

Checkbox.defaultProps = {
  name: undefined,
  label: undefined,
  value: false,
  info: undefined,
}

export default Checkbox
