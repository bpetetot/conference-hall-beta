import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, propTypes } from 'redux-form'

import { dayPicker, dayRangePicker, Label, SubmitButton, toggle } from 'components/form'
import CategoriesForm from './categories'
import FormatsForm from './formats'

import './cfp.css'

const CFPForm = ({ type, ...formProps }) => (
  <form className="cfp-form card">
    {type === 'conference' && (
      <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} />
    )}
    {type === 'conference' && (
      <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
    )}
    {type === 'meetup' && <Field name="cfpOpened" label="Open CFP" component={toggle} />}
    <Label label="Talk Categories">
      <FieldArray name="categories" component={CategoriesForm} />
    </Label>
    <Label label="Talk Formats">
      <FieldArray name="formats" component={FormatsForm} />
    </Label>
    <SubmitButton {...formProps}>Save CFP settings</SubmitButton>
  </form>
)

CFPForm.propTypes = {
  type: PropTypes.oneOf(['conference', 'meetup']).isRequired,
  ...propTypes,
}

export default CFPForm
