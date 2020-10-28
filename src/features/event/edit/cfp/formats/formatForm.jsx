import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './formatForm.css'

const FormatForm = ({ edit, onSubmit, initialValues }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ handleSubmit, pristine, invalid }) => (
      <form className="format-form">
        <h2>{edit ? 'Update format' : 'Add a new format'}</h2>
        <div className="format-form-content">
          <Field name="name" label="Name" type="text" component={input} validate={required} />
          <Field name="description" label="Description" type="text" component={textarea} />
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} invalid={invalid}>
            {edit ? 'Save format' : 'Add format'}
          </SubmitButton>
        </div>
      </form>
    )}
  </Form>
)

FormatForm.propTypes = {
  edit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

FormatForm.defaultProps = {
  edit: false,
  initialValues: {},
}

export default FormatForm
