import React from 'react'
import PropTypes from 'prop-types'

import InputButton from 'components/form/inputButton'

import './betaAccess.css'

const BetaAccess = ({ validateAccessKey, error }) => (
  <div className="beta-access">
    <h1 className="beta-access-title">Beta Access key needed</h1>
    <p>
      The organizer hall is in closed-beta access, you need an invite key to be able to access it.
    </p>
    <div className="beta-access-form">
      <InputButton
        btnLabel="Access beta"
        type="text"
        placeholder="Please type your beta access key here"
        onClick={validateAccessKey}
      />
    </div>
    {error && <div className="beta-access-error">{error}</div>}
  </div>
)

BetaAccess.propTypes = {
  validateAccessKey: PropTypes.func.isRequired,
  error: PropTypes.string,
}

BetaAccess.defaultProps = {
  error: undefined,
}

export default BetaAccess
