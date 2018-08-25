import React from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'
import cn from 'classnames'

import './backdrop.css'

const Backdrop = ({ onClick, withClickOutside, className }) => (
  <div
    className={cn('backdrop', className)}
    onClick={withClickOutside ? onClick : noop}
    role="button"
  />
)

Backdrop.propTypes = {
  onClick: PropTypes.func,
  withClickOutside: PropTypes.bool,
  className: PropTypes.string,
}

Backdrop.defaultProps = {
  onClick: undefined,
  withClickOutside: true,
  className: undefined,
}

export default Backdrop
