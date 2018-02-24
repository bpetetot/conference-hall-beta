/* eslint-disable react/prop-types */
import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'

import Toggle from './toggle'
import MarkdownInput from './markdownInput'
import { DayPicker, DayRangePicker } from './dayPicker'

import Label from './label'

const renderField = component => ({
  input, label, type, meta,
}) => (
  <Label name={input.name} label={label} error={meta.error}>
    {component === 'address' && (
      <PlacesAutocomplete
        inputProps={{ ...input, autoComplete: 'nope' }}
        styles={{ autocompleteContainer: { zIndex: 1 } }}
      />
    )}
    {component === 'input' && <input {...input} id={input.name} type={type} />}
    {component === 'textarea' && (
      <textarea id={input.name} {...input}>
        {input.value}
      </textarea>
    )}
    {component === 'markdown-input' && <MarkdownInput {...input} />}
    {component === 'dayPicker' && <DayPicker id={input.name} {...input} />}
    {component === 'dayRangePicker' && <DayRangePicker id={input.name} {...input} />}
    {component === 'toggle' && <Toggle {...input} name={input.name} />}
  </Label>
)

export default renderField
