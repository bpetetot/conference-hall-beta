import React from 'react'
import { Field as FinalFormField } from 'react-final-form'

const Field = props => (
  <FinalFormField {...props} parse={value => (value === '' ? null : value)} />
)

export default Field
