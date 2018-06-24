import React from 'react'
import PropTypes from 'prop-types'

import './backdrop.css'

const Backdrop = ({ onClick }) => <div className="backdrop" onClick={onClick} role="button" />

Backdrop.propTypes = {
  onClick: PropTypes.func,
}

Backdrop.defaultProps = {
  onClick: undefined,
}

export default Backdrop
