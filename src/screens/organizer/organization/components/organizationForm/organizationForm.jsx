import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm, propTypes } from 'redux-form'

import {
  input,
  SubmitButton,
} from 'components/form'
import { required } from 'components/form/validators'
import './organizationForm.css'

const OrganizationForm = ({ type, ...formProps }) => (
  <form className="organization-form card">
    <Field name="name" label="Name" type="text" component={input} validate={required} />
    <SubmitButton {...formProps}>
      {formProps.form === 'organization-create' ? 'Create organization' : 'Save organization'}
    </SubmitButton>
  </form>
)

OrganizationForm.propTypes = {
  ...propTypes,
  type: PropTypes.string,
}

OrganizationForm.defaultProps = {
  type: undefined,
}

export default reduxForm()(OrganizationForm)
