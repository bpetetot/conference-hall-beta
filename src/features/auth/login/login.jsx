import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import split from 'lodash/split'

import useRedirectNext from 'features/router/useRedirectNext'
import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import Button from 'components/button'

import { useAuth } from '../context'
import './login.css'

const PROVIDERS = split(process.env.REACT_APP_AUTH_PROVIDERS, ',') || []

const Login = () => {
  const [redirecting, setRedirecting] = useState(false)
  const [error, setError] = useState()
  const { user, loading, signin } = useAuth()
  const redirectNext = useRedirectNext()

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
      <h2>{user?.displayName}</h2>
      {PROVIDERS.map((provider) => (
        <Button key={provider} className={`btn-${provider}`} onClick={() => signin(provider)}>
          <IconLabel icon={`fa fa-${provider}`} label={`with ${provider}`} />
        </Button>
      ))}
      {error && <p className="login-error">{error}</p>}
    </div>
  )
}

export default Login
