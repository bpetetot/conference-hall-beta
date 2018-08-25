import React from 'react'
import PropTypes from 'prop-types'
import capitalize from 'lodash/capitalize'

import Button from 'components/button'
import './social.css'

const LoginSocial = ({ providers, signin, providerId }) => (
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
    {providerId && (
      <small className="login-last-connexion">{`Your last connexion was with ${capitalize(providerId)}`}</small>
    )}
  </div>
)

LoginSocial.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.string),
  signin: PropTypes.func.isRequired,
  providerId: PropTypes.string,
}

LoginSocial.defaultProps = {
  providers: [],
  providerId: undefined,
}

export default LoginSocial
