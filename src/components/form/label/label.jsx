import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'

const Label = ({
  name, label, children, error, noError,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error })}>
    {label && <label htmlFor={name}>{label}</label>}
    <div>
      {children}
      {!noError && <div className="form-error">{error || ''}</div>}
    </div>
  </div>
)

Label.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  noError: PropTypes.bool,
  error: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  name: undefined,
  noError: false,
  error: undefined,
}

export default Label
