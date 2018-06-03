import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import './api.css'

const ApiForm = ({
  apiActive, apiKey, onActiveApi, onGenerateKey,
}) => (
  <div className="api-form card">
    <Label name="apiActive" label="Enable API">
      <Toggle name="apiActive" value={apiActive} onChange={onActiveApi} />
    </Label>
    <Label name="apiKey" label="API key" className="generate-key-input">
      <input type="text" value={apiKey} disabled />
      <button className="btn btn-default" onClick={onGenerateKey} disabled={!apiActive}>
        Generate API Key
      </button>
    </Label>
    <div>
      <p className="api-label">All APIs must be called with a valid API Key:</p>
      <small>No API available yet</small>
    </div>
  </div>
)

ApiForm.propTypes = {
  apiActive: PropTypes.bool,
  apiKey: PropTypes.string,
  onActiveApi: PropTypes.func.isRequired,
  onGenerateKey: PropTypes.func.isRequired,
}

ApiForm.defaultProps = {
  apiActive: false,
  apiKey: undefined,
}

export default ApiForm
