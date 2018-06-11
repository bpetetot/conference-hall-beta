import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'

import './api.css'

const ApiForm = ({
  eventId, apiActive, apiKey, onActiveApi, onGenerateKey,
}) => (
  <div className="api-form card">
    <div className="api-label">Before enabling API, please read documentation available into the <a href="" target="_NEW">Github repository</a></div>
    <br />
    <Label name="apiActive" label="Enable API">
      <Toggle name="apiActive" value={apiActive} onChange={onActiveApi} />
    </Label>
    <Label name="apiKey" label="API key" className="generate-key-input">
      <input type="text" value={apiKey} disabled />
      <button className="btn btn-default" onClick={onGenerateKey} disabled={!apiActive}>
        Generate API Key
      </button>
    </Label>
    {apiActive && (
      <div>
        <br /><br />
        <div><b><code>GET {'/api/v1/event/{id}'}</code></b></div>
        <p>Expose formats, categories, accepted talks and speakers of the event</p>
        <p>
          <b>Try out: </b>
          <a href={`http://conference-hall.firebaseapp.com/api/v1/event/${eventId}?key=${apiKey}`} target="_NEW">
            {`https://conference-hall.firebaseapp.com/api/v1/event/${eventId}?key=${apiKey}`}
          </a>
        </p>
      </div>
    )}
  </div>
)

ApiForm.propTypes = {
  eventId: PropTypes.string.isRequired,
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
