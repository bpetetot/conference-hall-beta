import React from 'react'

import Button from 'components/button'

import './signup.css'

const Signup = () => (
  <div className="signup">
    <h1>Create an account</h1>
    <div className="signup-form">
      <input type="text" name="fullname" placeholder="Fullname" autoComplete="fullname" />
      <input type="text" name="email" placeholder="Email" autoComplete="email" />
      <input type="password" name="password" placeholder="Password" autoComplete="password" />
      <small className="signup-error">Email or password incorrect</small>
      <Button accent primary size="large" block className="signup-btn">
        GET STARTED
      </Button>
    </div>
  </div>
)

export default Signup
