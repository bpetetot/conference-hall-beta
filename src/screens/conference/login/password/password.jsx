import React from 'react'

import Button from 'components/button'

import './password.css'

const LoginPassword = () => (
  <div className="login-password">
    <input type="text" name="email" placeholder="Email" autoComplete="email" />
    <input type="password" name="password" placeholder="Password" autoComplete="password" />
    <small className="login-forget-password">
      <a onClick={() => {}} role="button">Forgot your password ?</a>
    </small>
    <Button primary className="signin-btn">
      LOGIN
    </Button>
    <small className="login-error">Email or password incorrect</small>
  </div>
)

export default LoginPassword
