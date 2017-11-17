import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './label.css'

const Label = ({
  name, label, children, meta,
}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={cn('form-label', { 'form-has-error': hasError })}>
      <label htmlFor={name}>{label}</label>
      <div>
        {children}
        {<div className="form-error">{meta.touched ? meta.error : ''}</div>}
      </div>
    </div>
  )
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  meta: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

Label.defaultProps = {
  meta: {},
}

export default Label
