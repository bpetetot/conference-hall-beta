import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import './social.css'

const LoginSocial = ({ providers, signin }) => (
  <div className="login-social">
    <div className="login-providers">
      {providers.map(provider => (
        <Button
          key={provider}
          className={`btn-social btn-${provider}`}
          round
          size="large"
          onClick={() => signin(provider)}
        >
          <i className={`fa fa-${provider}`} />
        </Button>
      ))}
    </div>
    <small className="login-last-connexion">Your last connexion was with Google</small>
  </div>
)

LoginSocial.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.string),
  signin: PropTypes.func.isRequired,
}

LoginSocial.defaultProps = {
  providers: [],
}

export default LoginSocial
