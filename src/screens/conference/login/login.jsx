import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import Button from 'components/button'

import LoginSocial from './social'
import LoginPassword from './password'
import AuthErrorModal from './authError'
import './login.css'

const Login = ({ authenticated, providers, signin }) => {
  if (authenticated) return <LoadingIndicator className="login-loading" />
  return (
    <div className="login">
      <div className="login-block card">
        <h1 className="login-title">Login</h1>
        <LoginPassword />
        <small className="login-or">Or Sign Up Using</small>
        <LoginSocial providers={providers} signin={signin} />
        <small className="login-signup">Have not account yet ?</small>
        <Button tertiary>SIGN UP</Button>
      </div>
      <AuthErrorModal />
    </div>
  )
}

Login.propTypes = {
  authenticated: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.string),
  signin: PropTypes.func.isRequired,
}

Login.defaultProps = {
  providers: [],
  authenticated: false,
}

export default Login
