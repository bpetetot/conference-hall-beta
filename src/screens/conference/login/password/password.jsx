import React from 'react'
import PropTypes from 'prop-types'

import { Field } from 'redux-form'
import { input, SubmitButton } from 'components/form'
import ChangePasswordModal from './change'

import './password.css'

const LoginPassword = ({ authError, ...formProps }) => (
  <form className="login-password">
    <Field type="email" name="email" placeholder="Email" autoComplete="email" component={input} />
    <Field
      type="password"
      name="password"
      placeholder="Password"
      autoComplete="password"
      component={input}
    />
    <ChangePasswordModal
      modalTrigger={({ show }) => (
        <small className="login-forget-password">
          <a onClick={show} role="button">
            Forgot your password ?
          </a>
        </small>
      )}
    />
    <SubmitButton {...formProps} accent primary size="large" block className="signin-btn">
      LOGIN
    </SubmitButton>
    {authError && <small className="login-error">{authError}</small>}
  </form>
)

LoginPassword.propTypes = {
  authError: PropTypes.string,
}

LoginPassword.defaultProps = {
  authError: undefined,
}

export default LoginPassword
