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
} from 'components/form'
import { required } from 'components/form/validators'
import './eventForm.css'
import { useOrganizationsForRoles } from '../../../data/organization'
import { ROLES } from '../../../firebase/constants'

const EventForm = ({ isCreateForm, onSubmit, initialValues, toggleArchive }) => {
  const organizations = useOrganizationsForRoles([ROLES.OWNER, ROLES.MEMBER])

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} keepDirtyOnReinitialize={isCreateForm}>
      {({ values, handleSubmit, pristine, invalid, submitting }) => (
        <form className="event-form card">
          {isCreateForm && (
            <RadioGroup name="type" label="Event type" value="CONFERENCE" inline>
              <Field
                name="type"
                value="CONFERENCE"
                label="Conference"
                type="radio"
                component={radio}
              />
              <Field name="type" value="MEETUP" label="Meetup" type="radio" component={radio} />
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
            label={values.type === 'CONFERENCE' ? 'Venue address' : 'City'}
            type="text"
            component={address}
            validate={required}
            inline
          />
          {!isEmpty(organizations) && (
            <Field label="Organization" name="organizationId" component={select} inline>
              <option />
              {organizations.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Field>
          )}
          <Field label="Visibility" name="visibility" component={select} inline>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </Field>
          {values.type === 'CONFERENCE' && (
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
            {!isCreateForm && (
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
              {isCreateForm ? 'Create event' : 'Save event'}
            </SubmitButton>
          </div>
        </form>
      )}
    </Form>
  )
}

EventForm.propTypes = {
  isCreateForm: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func,
  initialValues: PropTypes.object,
}

EventForm.defaultProps = {
  isCreateForm: false,
  initialValues: undefined,
  toggleArchive: undefined,
}

export default EventForm
