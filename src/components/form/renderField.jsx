/* eslint-disable react/prop-types */
import React from 'react'

import Toggle from './toggle'
import Address from './address'
import MarkdownInput from './markdownInput'
import { DayPicker, DayRangePicker } from './dayPicker'

import Label from './label'

const renderField = component => ({
  input, label, type, meta, placeholder, children, ...rest
}) => (
  <Label name={input.name} label={label} error={meta.error}>
    {component === 'address' && <Address {...input} autoComplete="nope" />}
    {component === 'input' && <input {...input} id={input.name} type={type} placeholder={placeholder} />}
    {component === 'select' && <select {...input} id={input.name}>{children}</select>}
    {component === 'textarea' && (
      <textarea id={input.name} {...input}>
        {input.value}
      </textarea>
    )}
    {component === 'markdown-input' && <MarkdownInput {...input} />}
    {component === 'dayPicker' && <DayPicker id={input.name} {...input} />}
    {component === 'dayRangePicker' && <DayRangePicker id={input.name} {...input} />}
    {component === 'toggle' && <Toggle {...rest} {...input} name={input.name} />}
  </Label>
)

export default renderField
