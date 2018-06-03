import React from 'react'
import PropTypes from 'prop-types'
import { Field, propTypes } from 'redux-form'

import { SubmitButton, toggle } from 'components/form'

import './api.css'

const ApiForm = ({ apiActive, ...formProps }) => (
  <form className="api-form card">
    <Field name="apiActive" label="Activate API" component={toggle} />
    <SubmitButton {...formProps}>Save</SubmitButton>
  </form>
)

ApiForm.propTypes = {
  apiActive: PropTypes.bool,
  ...propTypes,
}

ApiForm.defaultProps = {
  apiActive: false,
}

export default ApiForm
