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
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  info: PropTypes.string,
}

Checkbox.defaultProps = {
  value: false,
  info: undefined,
}

export default Checkbox
