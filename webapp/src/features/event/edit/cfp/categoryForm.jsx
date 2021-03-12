import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './categoryForm.css'

const CategoryForm = ({ edit, onSubmit, initialValues }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues}>
    {({ handleSubmit, pristine, invalid }) => (
      <form className="category-form">
        <h2>{edit ? 'Update category' : 'Add a new category'}</h2>
        <div className="category-form-content">
          <Field name="name" label="Name" type="text" component={input} validate={required} />
          <Field name="description" label="Description" type="text" component={textarea} />
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} invalid={invalid}>
            {edit ? 'Save category' : 'Add category'}
          </SubmitButton>
        </div>
      </form>
    )}
  </Form>
)

CategoryForm.propTypes = {
  edit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

CategoryForm.defaultProps = {
  edit: false,
  initialValues: {},
}

export default CategoryForm
