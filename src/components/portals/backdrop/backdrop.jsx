import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './backdrop.css'

function Backdrop({ onClick, withClickOutside }) {
  return (
    <div
      className="backdrop"
      onClick={withClickOutside ? onClick : noop}
      role="button"
      aria-label="Close"
    />
  )
}

Backdrop.propTypes = {
  onClick: PropTypes.func,
  withClickOutside: PropTypes.bool,
}

Backdrop.defaultProps = {
  onClick: undefined,
  withClickOutside: true,
}

export default Backdrop
