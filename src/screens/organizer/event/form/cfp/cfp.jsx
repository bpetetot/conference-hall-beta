import React from 'react'
import { Field, FieldArray, propTypes } from 'redux-form'

import { dayPicker, dayRangePicker, Label, SubmitButton } from 'components/form'
import CategoriesForm from './categories'

import './cfp.css'

const CFPForm = formProps => (
  <form className="cfp-form">
    <Field name="cfpDates" label="CFP opening dates" component={dayRangePicker} />
    <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
    <Label label="Talk Categories">
      <FieldArray name="categories" component={CategoriesForm} />
    </Label>
    <SubmitButton {...formProps} loadingMessage="Saving...">
      Save CFP settings
    </SubmitButton>
  </form>
)

CFPForm.propTypes = {
  ...propTypes,
}

export default CFPForm
