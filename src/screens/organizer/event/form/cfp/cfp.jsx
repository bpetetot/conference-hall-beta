import React from 'react'
import PropTypes from 'prop-types'
import { Field, FieldArray, propTypes } from 'redux-form'

import { dayPicker, dayRangePicker, Label, SubmitButton, RadioGroup, radio } from 'components/form'
import CategoriesForm from './categories'

import './cfp.css'

const CFPForm = ({ type, ...formProps }) => (
  <form className="cfp-form">
    {type === 'conference' && (
      <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} />
    )}
    {type === 'conference' && (
      <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
    )}
    {type === 'meetup' && (
      <RadioGroup name="meetupOpened" label="CFP Opening" inline>
        <Field name="meetupOpened" value="opened" label="Opened" type="radio" component={radio} />
        <Field name="meetupOpened" value="closed" label="Closed" type="radio" component={radio} />
      </RadioGroup>
    )}
    <Label label="Talk Categories">
      <FieldArray name="categories" component={CategoriesForm} />
    </Label>
    <SubmitButton {...formProps}>Save CFP settings</SubmitButton>
  </form>
)

CFPForm.propTypes = {
  type: PropTypes.oneOf(['conference', 'meetup']).isRequired,
  ...propTypes,
}

export default CFPForm
