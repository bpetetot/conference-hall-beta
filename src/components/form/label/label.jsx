import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'

const Label = ({
  name, label, children, error,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error })}>
    <label htmlFor={name}>{label}</label>
    <div>
      {children}
      {<div className="form-error">{error || ''}</div>}
    </div>
  </div>
)

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
}

Label.defaultProps = {
  error: undefined,
}

export default Label
