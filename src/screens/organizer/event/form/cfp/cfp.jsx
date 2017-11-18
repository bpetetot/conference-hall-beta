import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'

import DayPicker from 'components/form/dayPicker'
import DayRangePicker from 'components/form/dayPicker/dayRangePicker'
import { SubmitButton } from 'components/form'

import './cfp.css'

const CFPForm = ({
  handleSubmit, pristine, submitting, invalid,
}) => (
  <form onSubmit={handleSubmit} className="cfp-form">
    <DayPicker />
    <DayRangePicker />
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
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

export default CFPForm
