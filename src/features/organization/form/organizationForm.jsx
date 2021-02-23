import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import Field from 'components/form/field'
import { input, SubmitButton } from 'components/form'
import { required } from 'components/form/validators'

import './organizationForm.css'

const OrganizationForm = ({ onSubmit, initialValues }) => {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, pristine, submitting }) => (
        <form className="organization-form card">
          <Field name="name" label="Name" type="text" component={input} validate={required} />
          <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
            {!initialValues ? 'Create organization' : 'Save organization'}
          </SubmitButton>
        </form>
      )}
    </Form>
  )
}

OrganizationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
}

OrganizationForm.defaultProps = {
  initialValues: undefined,
}

export default OrganizationForm
