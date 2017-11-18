import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

import { input, address, textarea, radio, SubmitButton, RadioGroup } from 'components/form'
import { required } from 'components/form/validators'
import './mainForm.css'

const EventForm = ({
  form, handleSubmit, pristine, submitting, invalid, type,
}) => (
  <form onSubmit={handleSubmit} className="event-form">
    <RadioGroup name="type" inline>
      <Field name="type" value="conference" label="Conference" type="radio" component={radio} />
      <Field name="type" value="meetup" label="Meetup" type="radio" component={radio} />
    </RadioGroup>
    <Field name="name" label="Name" type="text" component={input} validate={required} autoFocus />
    <Field name="description" label="description" component={textarea} validate={required} />
    <Field
      name="address"
      label={type === 'conference' ? 'Venue address' : 'City'}
      type="text"
      component={address}
    />
    <Field name="website" label="Website" type="text" component={input} />
    <Field name="tags" label="Tags" type="text" component={input} />
    <SubmitButton
      disabled={pristine || submitting || invalid}
      submitting={submitting}
      loadingMessage="Saving..."
    >
      {form === 'event-create' ? 'Create event' : 'Update event'}
    </SubmitButton>
  </form>
)

EventForm.propTypes = {
  form: PropTypes.oneOf(['event-create', 'event-edit']).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  type: PropTypes.string,
}

EventForm.defaultProps = {
  type: undefined,
}

export default reduxForm({ form: 'event' })(EventForm)
