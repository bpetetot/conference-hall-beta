/* eslint-disable react/prop-types */
import React from 'react'
import cn from 'classnames'
import PlacesAutocomplete from 'react-places-autocomplete'

import './renderField.css'

const renderField = component => ({
  input, label, type, meta, autoFocus,
}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={cn('form-label', { 'form-has-error': hasError })}>
      <label htmlFor={input.name}>{label}</label>
      <div>
        {component === 'address' && <PlacesAutocomplete inputProps={input} />}
        {component === 'input' && (
          <input {...input} id={input.name} type={type} autoFocus={autoFocus} />
        )}
        {component === 'textarea' && (
          <textarea id={input.name} {...input} autoFocus={autoFocus}>
            {input.value}
          </textarea>
        )}
        {<div className="form-error">{meta.touched ? meta.error : ''}</div>}
      </div>
    </div>
  )
}

export default renderField
