import React from 'react'
import PropTypes from 'prop-types'

import './textarea.css'

const Textarea = ({ name, value, ...rest }) => (
  <textarea name={name} {...rest}>
    {value}
  </textarea>
)

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
}

Textarea.defaultProps = {
  value: undefined,
}

export default Textarea
