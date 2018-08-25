import React from 'react'

import { Field } from 'redux-form'
import { input, SubmitButton } from 'components/form'

import './signup.css'

const Signup = ({ authError, ...formProps }) => (
  <div className="signup">
    <h1>Create an account</h1>
    <form className="signup-form">
      <Field
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        component={input}
      />
      <Field
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="password"
        component={input}
      />
      <small className="signup-error">{authError}</small>
      <SubmitButton {...formProps} accent primary size="large" block className="signup-btn">
        GET STARTED
      </SubmitButton>
    </form>
  </div>
)

export default Signup
