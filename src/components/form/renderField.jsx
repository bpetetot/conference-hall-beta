/* eslint-disable react/prop-types */
import React from 'react'
import cn from 'classnames'

import './renderField.css'

const renderField = component => ({
  input, label, type, meta,
}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={cn('form-label', { 'form-has-error': hasError })}>
      <label htmlFor={input.name}>{label}</label>
      {component === 'input' && <input {...input} type={type} />}
      {component === 'textarea' && <textarea {...input}>{input.value}</textarea>}
    </div>
  )
}

export default renderField
