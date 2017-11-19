import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from '../label'
import './radioGroup.css'

const RadioGroup = ({
  name, label, children, inline, className,
}) => {
  const classes = cn('form-radio-group', className, {
    'form-radio-group-inline': inline,
    'form-radio-group-col': !inline,
  })
  return (
    <Label name={name} label={label}>
      <div className={classes}>{children}</div>
    </Label>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  inline: PropTypes.bool,
  className: PropTypes.string,
}

RadioGroup.defaultProps = {
  inline: false,
  className: undefined,
}

export default RadioGroup
