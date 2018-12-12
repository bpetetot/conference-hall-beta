import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'
import arrayMutators from 'final-form-arrays'

import {
  dayPicker, dayRangePicker, Label, SubmitButton, toggle,
} from 'components/form'
import CategoriesForm from './categories'
import FormatsForm from './formats'

import './cfp.css'

const CFPForm = ({ type, onSubmit, initialValues }) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} mutators={{ ...arrayMutators }}>
    {({ handleSubmit, pristine }) => (
      <form className="cfp-form card">
        {type === 'conference' && (
          <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} />
        )}
        {type === 'conference' && (
          <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
        )}
        {type === 'meetup' && (
          <Field name="cfpOpened" label="Open CFP" type="checkbox" component={toggle} />
        )}
        <Label label="Talk Categories">
          <FieldArray
            name="categories"
            render={({ fields }) => <CategoriesForm fields={fields} />}
          />
        </Label>
        <Label label="Talk Formats">
          <FieldArray name="formats" render={({ fields }) => <FormatsForm fields={fields} />} />
        </Label>
        <SubmitButton handleSubmit={handleSubmit} pristine={pristine}>
          Save CFP settings
        </SubmitButton>
      </form>
    )}
  </Form>
)

CFPForm.propTypes = {
  type: PropTypes.oneOf(['conference', 'meetup']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

CFPForm.defaultProps = {
  initialValues: {},
}

export default CFPForm
