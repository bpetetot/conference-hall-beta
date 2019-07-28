import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import './checkbox.css'

const Checkbox = (props) => {
  const {
    name, label, value, info, indeterminate, ...rest
  } = props

  const checkboxEl = useRef()

  useEffect(() => {
    if (checkboxEl && checkboxEl.current) {
      checkboxEl.current.indeterminate = !!value && indeterminate
    }
  }, [value, indeterminate])

  return (
    <div className="form-checkbox">
      <input
        ref={checkboxEl}
        name={name}
        id={`${name}-${value}`}
        type="checkbox"
        checked={!!value}
        value={value}
        {...rest}
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
  info: PropTypes.string,
  indeterminate: PropTypes.bool,
}

Checkbox.defaultProps = {
  name: undefined,
  label: undefined,
  value: false,
  info: undefined,
  indeterminate: false,
}

export default Checkbox
