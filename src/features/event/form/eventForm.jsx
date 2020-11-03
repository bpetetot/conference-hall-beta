import React from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
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
import { useOrganizations } from 'features/organization/useOrganizations'
import './eventForm.css'
import { useCurrentEvent } from '../currentEventContext'

const DEFAULT_VALUES = {
  type: 'conference',
  visibility: true,
  conferenceDates: {},
}

const EventForm = ({ onSubmit, toggleArchive }) => {
  const { data: organizations } = useOrganizations()
  const { data: event } = useCurrentEvent()

  const initialValues = !event
    ? DEFAULT_VALUES
    : pick(event, [
        'type',
        'name',
        'description',
        'address',
        'organization',
        'visibility', // TODO string => boolean
        'conferenceDate',
        'conferenceDate',
        'website',
        'contact',
      ])

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} keepDirtyOnReinitialize={!event}>
      {({ values, handleSubmit, pristine, invalid, submitting }) => (
        <form className="event-form card">
          {!event && (
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
          <Field
            name="name"
            label="Name"
            type="text"
            component={input}
            validate={required}
            inline
          />
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
            inline
          />
          {values.type === 'conference' && (
            <Field
              name="conferenceDates"
              label="Conference date"
              component={dayRangePicker}
              inline
            />
          )}
          <Field name="website" label="Website" type="text" component={input} inline />
          <Field name="contact" label="Contact email" type="email" component={input} inline />
          <div className="event-form-actions">
            {!!event && (
              <Button secondary onClick={toggleArchive}>
                {values.archived ? (
                  <IconLabel icon="fa fa-history" label="Restore event" />
                ) : (
                  <IconLabel icon="fa fa-archive" label="Archive event" />
                )}
              </Button>
            )}
            <SubmitButton
              handleSubmit={handleSubmit}
              pristine={pristine}
              invalid={invalid}
              submitting={submitting}
            >
              {!event ? 'Create event' : 'Save event'}
            </SubmitButton>
          </div>
        </form>
      )}
    </Form>
  )
}

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func,
}

EventForm.defaultProps = {
  toggleArchive: undefined,
}

export default EventForm
