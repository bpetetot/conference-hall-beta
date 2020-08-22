import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import { forRoute } from '@k-redux-router/react-k-ramel'
import { inject } from '@k-ramel/react'
import split from 'lodash/split'

import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'

import { useAuth } from '../context'
import './login.css'

const PROVIDERS = split(process.env.REACT_APP_AUTH_PROVIDERS, ',') || []

const Login = ({ redirectNext }) => {
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState()
  const { user, loading, signin } = useAuth()

  useEffect(() => {
    if (user && !redirecting) redirectNext()
  }, [user, redirecting, redirectNext])

  useEffect(() => {
    setRedirecting(true)
    firebase
      .auth()
      .getRedirectResult()
      .then(() => setRedirecting(false))
      .catch((e) => {
        setRedirecting(false)
        setError(e.message)
      })
  }, [])

  if (redirecting || loading) {
    return <LoadingIndicator className="login-loading" />
  }

  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      {PROVIDERS.map((provider) => (
        <Button key={provider} className={`btn-${provider}`} onClick={() => signin(provider)}>
          <IconLabel icon={`fa fa-${provider}`} label={`with ${provider}`} />
        </Button>
      ))}
      {error && <p className="login-error">{error}</p>}
    </div>
  )
}

Login.propTypes = {
  redirectNext: PropTypes.func.isRequired,
}

const LoginContainer = inject((store) => {
  return {
    redirectNext: () => {
      store.dispatch('@@router/REDIRECT_TO_NEXT_URL')
    },
  }
})(Login)

export default forRoute.absolute('login')(LoginContainer)
