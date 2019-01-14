import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

import Field from 'components/form/field'
import {
  dayPicker, dayRangePicker, Label, SubmitButton, toggle,
} from 'components/form'
import CategoriesField from './categories'
import FormatsField from './formats'

import './cfp.css'

const CFPForm = ({
  type, onSubmit, initialValues, submitting,
}) => (
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
          <CategoriesField />
        </Label>
        <Label label="Talk Formats">
          <FormatsField />
        </Label>
        <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
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
  submitting: PropTypes.bool,
}

CFPForm.defaultProps = {
  initialValues: {},
  submitting: false,
}

export default CFPForm
