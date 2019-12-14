import firebase from 'firebase/app'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import AppLayout from 'layout'
import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'
import styles from './login.module.css'

const Login = ({ authenticated, initialized, providers, signin }) => {
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
      .catch(error => {
        setAuthenticating(false)
        setErrorMessage(error.message)
      })
  }, [])

  if (!initialized || authenticating || authenticated) {
    return <LoadingIndicator />
  }

  return (
    <AppLayout className={styles.login} fullwidth>
      <h1 className={styles.title}>Connexion</h1>
      <div className={styles.buttons}>
        {providers.map(provider => (
          <Button
            key={provider}
            className={styles[`btn-${provider}`]}
            onClick={() => signin(provider)}
            size="large"
          >
            <IconLabel icon={`fa fa-${provider}`} label={`with ${provider}`} />
          </Button>
        ))}
      </div>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </AppLayout>
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
