import React from 'react'
import { Field, reduxForm, propTypes } from 'redux-form'

import {
  input,
  SubmitButton,
} from 'components/form'
import { required } from 'components/form/validators'
import './organizationForm.css'

const OrganizationForm = ({ ...formProps }) => (
  <form className="organization-form card">
    <Field name="name" label="Name" type="text" component={input} validate={required} />
    <SubmitButton {...formProps}>
      {formProps.form === 'organization-create' ? 'Create organization' : 'Save organization'}
    </SubmitButton>
  </form>
)

OrganizationForm.propTypes = {
  ...propTypes,
}

export default reduxForm()(OrganizationForm)
