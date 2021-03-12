import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from '../label'
import './radioGroup.css'

const RadioGroup = ({ name, label, children, inline, error, className }) => {
  const classes = cn('form-radio-group', className, {
    'form-radio-group-inline': inline,
    'form-radio-group-col': !inline,
  })
  return (
    <Label name={name} label={label} inline error={error}>
      <div className={classes}>{children}</div>
    </Label>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  inline: PropTypes.bool,
  error: PropTypes.string,
  className: PropTypes.string,
}

RadioGroup.defaultProps = {
  inline: false,
  label: undefined,
  error: undefined,
  className: undefined,
}

export default RadioGroup
