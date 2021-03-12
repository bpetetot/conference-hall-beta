import React from 'react'
import PropTypes from 'prop-types'

import './radioBox.css'

const RadioBox = ({ name, value, children, ...rest }) => (
  <label className="form-radio" htmlFor={`${name}-${value}`}>
    <input name={name} id={`${name}-${value}`} type="radio" value={value} {...rest} />
    <span>{children}</span>
  </label>
)

RadioBox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

RadioBox.defaultProps = {
  checked: false,
}

export default RadioBox
