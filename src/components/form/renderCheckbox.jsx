/* eslint-disable react/prop-types */
import React from 'react'
import Checkbox from './checkbox'

const renderCheckbox = ({
  input, disabled, label, info,
}) => (
  <Checkbox {...input} disabled={disabled} value={input.value}>
    {label}
    {info && <small style={{ marginLeft: '1em' }}>{info}</small>}
  </Checkbox>
)

export default renderCheckbox
