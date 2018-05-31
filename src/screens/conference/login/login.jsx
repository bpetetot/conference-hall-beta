import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import './login.css'

const Login = ({
  authenticated, providers, signin, error,
}) => {
  if (authenticated) return <LoadingIndicator className="login-loading" />
  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      {providers.map(provider => (
        <button key={provider} className={`btn btn-${provider}`} onClick={() => signin(provider)}>
          <IconLabel icon={`fa fa-${provider}`} label={`With ${provider}`} />
        </button>
      ))}
      <div>{error.message}</div>
    </div>
  )
}

Login.propTypes = {
  authenticated: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.string),
  signin: PropTypes.func.isRequired,
  error: PropTypes.shape({
    code: PropTypes.string,
    message: PropTypes.string,
  }),
}

Login.defaultProps = {
  providers: [],
  authenticated: false,
  error: {},
}

export default Login
