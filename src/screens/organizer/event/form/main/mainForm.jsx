import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'

import {
  input,
  address,
  textarea,
  radio,
  SubmitButton,
  RadioGroup,
  dayRangePicker,
} from 'components/form'
import { required } from 'components/form/validators'
import './mainForm.css'

const EventForm = ({ type, ...formProps }) => (
  <form className="event-form">
    {formProps.form === 'event-create' && (
      <RadioGroup name="type" label="Event type" inline>
        <Field name="type" value="conference" label="Conference" type="radio" component={radio} />
        <Field name="type" value="meetup" label="Meetup" type="radio" component={radio} />
      </RadioGroup>
    )}
    <Field name="name" label="Name" type="text" component={input} validate={required} autoFocus />
    <Field name="description" label="description" component={textarea} validate={required} />
    <Field
      name="address"
      label={type === 'conference' ? 'Venue address' : 'City'}
      type="text"
      component={address}
    />
    {type === 'conference' && (
      <Field name="conferenceDates" label="Conference date" component={dayRangePicker} />
    )}
    <Field name="website" label="Website" type="text" component={input} />
    <SubmitButton {...formProps}>
      {formProps.form === 'event-create' ? 'Create event' : 'Update event'}
    </SubmitButton>
  </form>
)

EventForm.propTypes = {
  ...propTypes,
  type: PropTypes.string,
}

EventForm.defaultProps = {
  type: undefined,
}

export default reduxForm()(EventForm)
