import React from 'react'
import { Field as FinalFormField } from 'react-final-form'

function Field(props) {
  return <FinalFormField {...props} parse={(value) => (value === '' ? null : value)} />
}

export default Field
