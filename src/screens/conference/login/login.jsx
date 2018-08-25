import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'

import LoginSocial from './social'
import LoginPassword from './password'
import SignUpModal from './signup'
import './login.css'

const Login = ({ authenticated }) => {
  if (authenticated) return <LoadingIndicator className="login-loading" />
  return (
    <div className="login">
      <div className="login-block card">
        <h1 className="login-title">Login</h1>
        <LoginPassword />
        <small className="login-or">Or Sign Up Using</small>
        <LoginSocial />
        <small className="login-signup">Have not account yet ?</small>
        <SignUpModal />
      </div>
    </div>
  )
}

Login.propTypes = {
  authenticated: PropTypes.bool,
}

Login.defaultProps = {
  authenticated: false,
}

export default Login
