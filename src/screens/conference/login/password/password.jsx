import React from 'react'

import { Field } from 'redux-form'
import { input, SubmitButton } from 'components/form'

import './password.css'

const LoginPassword = ({ authError, ...formProps }) => (
  <form className="login-password">
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
    <small className="login-forget-password">
      <a onClick={() => {}} role="button">
        Forgot your password ?
      </a>
    </small>
    <SubmitButton {...formProps} accent primary size="large" block className="signin-btn">
      LOGIN
    </SubmitButton>
    {authError && <small className="login-error">{authError}</small>}
  </form>
)

export default LoginPassword
