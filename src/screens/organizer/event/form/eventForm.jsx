import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import Field from 'components/form/field'
import {
  input,
  select,
  address,
  markdownInput,
  radio,
  SubmitButton,
  RadioGroup,
  dayRangePicker,
  toggle,
} from 'components/form'
import { required } from 'components/form/validators'
import './eventForm.css'

const EventForm = ({
  isCreateForm, organizations, onSubmit, initialValues, submitting,
}) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} keepDirtyOnReinitialize={isCreateForm}>
    {({
      values, handleSubmit, pristine, invalid,
    }) => (
      <form className="event-form card">
        {isCreateForm && (
        <RadioGroup name="type" label="Event type" value="conference" inline>
          <Field
            name="type"
            value="conference"
            label="Conference"
            type="radio"
            component={radio}
          />
          <Field name="type" value="meetup" label="Meetup" type="radio" component={radio} />
        </RadioGroup>
        )}
        <Field name="name" label="Name" type="text" component={input} validate={required} />
        <Field
          name="description"
          label="description"
          component={markdownInput}
          validate={required}
        />
        {!isEmpty(organizations) && (
        <Field label="Organization" name="organization" component={select}>
          <option />
          {organizations.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Field>
        )}
        <Field
          name="visibility"
          label="Private event"
          component={toggle}
          type="checkbox"
          truthy="private"
          falsy="public"
        />
        <Field
          name="address"
          label={values.type === 'conference' ? 'Venue address' : 'City'}
          type="text"
          component={address}
        />
        {values.type === 'conference' && (
        <Field name="conferenceDates" label="Conference date" component={dayRangePicker} />
        )}
        <Field name="website" label="Website" type="text" component={input} />
        <Field name="contact" label="Email contact" type="email" component={input} />
        <SubmitButton
          handleSubmit={handleSubmit}
          pristine={pristine}
          invalid={invalid}
          submitting={submitting}
        >
          {isCreateForm ? 'Create event' : 'Save event'}
        </SubmitButton>
      </form>
    )}
  </Form>
)

EventForm.propTypes = {
  isCreateForm: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

EventForm.defaultProps = {
  isCreateForm: false,
  organizations: [],
  initialValues: undefined,
  submitting: false,
}

export default EventForm
