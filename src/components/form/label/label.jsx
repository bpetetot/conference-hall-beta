import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'

const Label = ({
  name, label, className, children, error, classNameInput,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error }, className)}>
    {label && <label htmlFor={name}>{label}</label>}
    <div className={classNameInput}>
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
  classNameInput: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  name: undefined,
  error: undefined,
  className: undefined,
  classNameInput: undefined,
}

export default Label
