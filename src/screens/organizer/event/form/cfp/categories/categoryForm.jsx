import React from 'react'
import { compose } from 'redux'
import { Field, reduxForm, propTypes } from 'redux-form'

import { withModal } from 'components/modal'
import { input, textarea, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './categoryForm.css'

const CategoryForm = ({ edit, ...formProps }) => (
  <form className="category-form">
    <h2>{edit ? 'Update category' : 'Add a new category'}</h2>
    <div className="category-form-content">
      <Field name="name" label="Name" type="text" component={input} validate={required} autoFocus />
      <Field name="description" label="Description" type="text" component={textarea} />
      <SubmitButton {...formProps} className="btn-save-category">
        {edit ? 'Update category' : 'Add category'}
      </SubmitButton>
    </div>
  </form>
)

CategoryForm.propTypes = {
  ...propTypes,
}

export default compose(withModal(), reduxForm({ form: 'category' }))(CategoryForm)
