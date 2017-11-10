import React from 'react'
import PropTypes from 'prop-types'

import './input.css'

const Input = ({
  name, type, value, ...rest
}) => (
  <input id={name} type={type} defaultValue={value} {...rest} />
)

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

Input.defaultProps = {
  value: undefined,
}

export default Input
