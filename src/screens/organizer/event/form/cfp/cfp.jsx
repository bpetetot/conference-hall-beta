import React from 'react'
import { Field, FieldArray, propTypes } from 'redux-form'

import { categories, dayPicker, dayRangePicker, SubmitButton } from 'components/form'

import './cfp.css'

const CFPForm = ({
  handleSubmit, pristine, submitting, invalid,
}) => (
  <form onSubmit={handleSubmit} className="cfp-form">
    <Field name="cfpDates" label="CFP opening dates" component={dayRangePicker} />
    <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
    <FieldArray
      name="categories"
      label="Categories"
      component={categories('categories', 'Categories')}
    />
    <SubmitButton
      disabled={pristine || submitting || invalid}
      submitting={submitting}
      loadingMessage="Saving..."
    >
      Save CFP settings
    </SubmitButton>
  </form>
)

CFPForm.propTypes = {
  ...propTypes,
}

export default CFPForm
