import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'

import {
  input,
  select,
  address,
  markdownInput,
  radio,
  SubmitButton,
  RadioGroup,
  dayRangePicker,
} from 'components/form'
import { required } from 'components/form/validators'
import './eventForm.css'

const EventForm = ({ type, organizations, ...formProps }) => (
  <form className="event-form card">
    {formProps.form === 'event-create' && (
      <RadioGroup name="type" label="Event type" inline>
        <Field name="type" value="conference" label="Conference" type="radio" component={radio} />
        <Field name="type" value="meetup" label="Meetup" type="radio" component={radio} />
      </RadioGroup>
    )}
    <Field name="name" label="Name" type="text" component={input} validate={required} />
    <Field name="description" label="description" component={markdownInput} validate={required} />
    {organizations.length && (
      <Field label="Organization" name="organization" component={select}>
        <option />
        {organizations.map(({ id, name }) => (
          <option key={id} value={id}>{name}</option>
        ))}
      </Field>
    )}
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
    <Field name="contact" label="Email contact" type="email" component={input} />
    <SubmitButton {...formProps}>
      {formProps.form === 'event-create' ? 'Create event' : 'Save event'}
    </SubmitButton>
  </form>
)

EventForm.propTypes = {
  ...propTypes,
  type: PropTypes.string,
  organizations: PropTypes.arrayOf(PropTypes.object),
}

EventForm.defaultProps = {
  type: undefined,
  organizations: [],
}

export default reduxForm()(EventForm)
