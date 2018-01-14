import React from 'react'
import PropTypes from 'prop-types'

import { LoadingIndicator } from 'components/loader'
import IconLabel from 'components/iconLabel'
import './login.css'

const Login = ({ authenticated, signin }) => {
  if (authenticated) return <LoadingIndicator className="login-loading" />
  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      <button className="btn btn-google" onClick={() => signin('google')}>
        <IconLabel icon="fa fa-google" label="With Google" />
      </button>
      <button className="btn btn-twitter" onClick={() => signin('twitter')}>
        <IconLabel icon="fa fa-twitter" label="With Twitter" />
      </button>
      <button className="btn btn-github" onClick={() => signin('github')}>
        <IconLabel icon="fa fa-github" label="With Github" />
      </button>
    </div>
  )
}

Login.propTypes = {
  authenticated: PropTypes.bool,
  signin: PropTypes.func.isRequired,
}

Login.defaultProps = {
  authenticated: false,
}

export default Login
