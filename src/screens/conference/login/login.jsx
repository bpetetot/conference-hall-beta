import firebase from 'firebase/app'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import './login.css'

const Login = ({
  authenticated, initialized, providers, signin,
}) => {
  const [authenticating, setAuthenticating] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    setAuthenticating(true)
    firebase
      .auth()
      .getRedirectResult()
      .then(() => {
        setAuthenticating(false)
      })
      .catch((error) => {
        setAuthenticating(false)
        setErrorMessage(error.message)
      })
  }, [])

  if (!initialized || authenticating || authenticated) {
    return <LoadingIndicator className="login-loading" />
  }

  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      {providers.map(provider => (
        <Button key={provider} className={`btn-${provider}`} onClick={() => signin(provider)}>
          <IconLabel icon={`fa fa-${provider}`} label={`with ${provider}`} />
        </Button>
      ))}
      {errorMessage && <p className="login-error">{errorMessage}</p>}
    </div>
  )
}

Login.propTypes = {
  initialized: PropTypes.bool,
  authenticated: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.string),
  signin: PropTypes.func.isRequired,
}

Login.defaultProps = {
  providers: [],
  initialized: false,
  authenticated: false,
}

export default Login
