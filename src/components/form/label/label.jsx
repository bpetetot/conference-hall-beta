import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'
import Tooltip from 'components/tooltip/tooltip'

const Label = ({
  name, label, title, className, children, error, classNameInput,
}) => (
  <div className={cn('form-label', { 'form-has-error': !!error }, className)}>
    {label && (
      <label htmlFor={name}>
        {title ? <Tooltip tooltip={title} placement="bottom">{label}</Tooltip> : label}
      </label>
    )}
    <div className={classNameInput}>
      {children}
      {error && <div className="form-error">{error || ''}</div>}
    </div>
  </div>
)

Label.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  classNameInput: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  title: undefined,
  name: undefined,
  error: undefined,
  className: undefined,
  classNameInput: undefined,
}

export default Label
