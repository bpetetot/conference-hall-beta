import React from 'react'
import { Field, propTypes } from 'redux-form'

import { dayPicker, dayRangePicker, SubmitButton } from 'components/form'

import './cfp.css'

const CFPForm = ({
  handleSubmit, pristine, submitting, invalid,
}) => (
  <form onSubmit={handleSubmit} className="cfp-form">
    <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
    <Field name="cfpDates" label="CFP date" component={dayRangePicker} />
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
