import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import isEmpty from 'lodash/isEmpty'

import Field from 'components/form/field'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
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
  isCreateForm, organizations, onSubmit, initialValues, submitting, toggleArchive,
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
        <Field name="name" label="Name" type="text" component={input} validate={required} inline />
        <Field
          name="description"
          label="Description"
          component={markdownInput}
          validate={required}
          inline
        />
        <Field
          name="address"
          label={values.type === 'conference' ? 'Venue address' : 'City'}
          type="text"
          component={address}
          validate={required}
          inline
        />
        {!isEmpty(organizations) && (
        <Field label="Organization" name="organization" component={select} inline>
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
          inline
        />
        {values.type === 'conference' && (
        <Field name="conferenceDates" label="Conference date" component={dayRangePicker} inline />
        )}
        <Field name="website" label="Website" type="text" component={input} inline />
        <Field name="contact" label="Contact email" type="email" component={input} inline />
        <div className="event-form-actions">
          {!isCreateForm && (
            <Button secondary onClick={toggleArchive}>
              {values.archived ? (
                <IconLabel icon="fa fa-history" label="Restore" />
              ) : (
                <IconLabel icon="fa fa-archive" label="Archive" />
              )}
            </Button>
          )}
          <SubmitButton
            handleSubmit={handleSubmit}
            pristine={pristine}
            invalid={invalid}
            submitting={submitting}
          >
            {isCreateForm ? 'Create event' : 'Save event'}
          </SubmitButton>
        </div>
      </form>
    )}
  </Form>
)

EventForm.propTypes = {
  isCreateForm: PropTypes.bool,
  organizations: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func.isRequired,
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
