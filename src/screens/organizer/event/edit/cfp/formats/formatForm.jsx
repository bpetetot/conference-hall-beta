import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'

import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './formatForm.css'

const FormatForm = ({ edit, ...formProps }) => (
  <form className="format-form">
    <h2>{edit ? 'Update format' : 'Add a new format'}</h2>
    <div className="format-form-content">
      <Field name="name" label="Name" type="text" component={input} validate={required} />
      <Field name="description" label="Description" type="text" component={textarea} />
      <SubmitButton {...formProps} className="btn-save-format">
        {edit ? 'Save format' : 'Add format'}
      </SubmitButton>
    </div>
  </form>
)

FormatForm.propTypes = {
  ...propTypes,
}

export default reduxForm({ form: 'format' })(FormatForm)
