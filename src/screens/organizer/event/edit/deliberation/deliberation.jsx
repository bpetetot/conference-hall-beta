import React from 'react'
import PropTypes from 'prop-types'
import { Field, propTypes } from 'redux-form'

import { SubmitButton, toggle } from 'components/form'

import './deliberation.css'

const DeliberationForm = ({ deliberationActive, ...formProps }) => (
  <form className="deliberation-form card">
    <Field name="deliberationActive" label="Activate Deliberation" component={toggle} />
    <SubmitButton {...formProps}>Save</SubmitButton>
  </form>
)

DeliberationForm.propTypes = {
  deliberationActive: PropTypes.bool,
  ...propTypes,
}

DeliberationForm.defaultProps = {
  deliberationActive: false,
}

export default DeliberationForm
