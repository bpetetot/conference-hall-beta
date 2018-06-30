import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import './backdrop.css'

const Backdrop = ({ onClick, withClickOutside }) => (
  <div className="backdrop" onClick={withClickOutside ? onClick : noop} role="button" />
)

Backdrop.propTypes = {
  onClick: PropTypes.func,
  withClickOutside: PropTypes.bool,
}

Backdrop.defaultProps = {
  onClick: undefined,
  withClickOutside: true,
}

export default Backdrop
