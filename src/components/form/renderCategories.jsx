/* eslint-disable react/prop-types */
import React from 'react'
import { Field } from 'redux-form'

import Label from './label'

const renderCategories = (name, label) => ({ fields, meta }) => (
  <Label name={name} label={label} error={meta.error}>
    <button className="btn btn-primary" onClick={() => fields.push({})}>
      <i className="fa fa-plus" />
    </button>
    {fields.map((category, index) => (
      <div key={index}>
        <Field name={`${category}.name`} type="text" component="input" />
        <button className="btn btn-primary" onClick={() => fields.remove(index)}>
          <i className="fa fa-remove" />
        </button>
      </div>
    ))}
  </Label>
)

export default renderCategories
