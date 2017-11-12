import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { input, address, textarea, SubmitButton, required } from 'components/form'
import './eventEdit.css'

const Event = ({
  handleSubmit, pristine, submitting, invalid,
}) => (
  <form onSubmit={handleSubmit} className="event-form">
    <Field name="name" label="Name" type="text" component={input} validate={required} />
    <Field name="description" label="description" component={textarea} validate={required} />
    <Field name="address" label="Venue address" type="text" component={address} />
    <Field name="website" label="Website" type="text" component={input} />
    <Field name="tags" label="Tags" type="text" component={input} />
    <SubmitButton
      disabled={pristine || submitting || invalid}
      submitting={submitting}
      loadingMessage="Saving..."
    >
      Create event
    </SubmitButton>
  </form>
)

Event.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
}

export default reduxForm({ form: 'event' })(Event)
