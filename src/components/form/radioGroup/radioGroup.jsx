import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Label from '../label'
import './radioGroup.css'

const RadioGroup = ({
  name, label, children, inline, noError, className,
}) => {
  const classes = cn('form-radio-group', className, {
    'form-radio-group-inline': inline,
    'form-radio-group-col': !inline,
  })
  return (
    <Label name={name} label={label} noError={noError} inline>
      <div className={classes}>{children}</div>
    </Label>
  )
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  inline: PropTypes.bool,
  noError: PropTypes.bool,
  className: PropTypes.string,
}

RadioGroup.defaultProps = {
  inline: false,
  label: undefined,
  noError: false,
  className: undefined,
}

export default RadioGroup
