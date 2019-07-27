import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import arrayMutators from 'final-form-arrays'

import Field from 'components/form/field'
import {
  input, dayPicker, dayRangePicker, Label, SubmitButton, toggle,
} from 'components/form'
import CategoriesField from './categories'
import FormatsField from './formats'

import './cfp.css'

const CFPForm = ({
  type, onSubmit, initialValues, submitting,
}) => (
  <Form onSubmit={onSubmit} initialValues={initialValues} mutators={{ ...arrayMutators }}>
    {({ handleSubmit, pristine }) => (
      <form className="cfp-form card">
        {type === 'conference' && (
          <Field name="cfpDates" label="CFP opening period" component={dayRangePicker} />
        )}
        {type === 'conference' && (
          <Field name="deliberationDate" label="Deliberation date" component={dayPicker} />
        )}
        {type === 'conference' && (
          <Field name="maxProposals" label="Max proposals" type="number" component={input} />
        )}
        {type === 'meetup' && (
          <Field name="cfpOpened" label="Open CFP" type="checkbox" component={toggle} />
        )}
        <Label label="Talk Categories">
          <CategoriesField />
        </Label>
        <Label label="Talk Formats">
          <FormatsField />
        </Label>
        <h2>Email notifications</h2>
        <p>
          When a speaker is accepted, rejected, or when he/she confirms or declines his/her presence
          an email is sent. You can configure which email you want to receive the email
          notification. You can set the contact email and/or the organizers emails.
        </p>
        <Field
          name="emailcontact"
          type="checkbox"
          label="conference mailing list"
          component={toggle}
          truthy="true"
          falsy="false"
        />
        <Field
          name="emailorga"
          type="checkbox"
          label="private orgas' emails"
          component={toggle}
          truthy="true"
          falsy="false"
        />
        <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
          Save CFP settings
        </SubmitButton>
      </form>
    )}
  </Form>
)

CFPForm.propTypes = {
  type: PropTypes.oneOf(['conference', 'meetup']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool,
}

CFPForm.defaultProps = {
  initialValues: {},
  submitting: false,
}

export default CFPForm
