import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'

const Label = ({
  name, label, className, children, error,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error }, className)}>
    {label && <label htmlFor={name}>{label}</label>}
    <div>
      {children}
      {error && <div className="form-error">{error || ''}</div>}
    </div>
  </div>
)

Label.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  name: undefined,
  error: undefined,
  className: undefined,
}

export default Label
