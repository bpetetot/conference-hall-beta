import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import ApiCard from './apiCard'

import './api.css'

const ApiForm = ({
  eventId, apiActive, apiKey, onActiveApi, onGenerateKey,
}) => {
  const { origin } = window.location
  return (
    <Fragment>
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
        <div className="api-label">
          Before enabling API, read the documentation available into the{' '}
          <a href="" target="_NEW">
            Github repository
          </a>
        </div>
      </div>
      {apiActive && (
        <Fragment>
          <h2 className="api-title">APIs description</h2>
          <ApiCard
            name="GET /api/v1/event/{id}"
            description="Expose formats, categories, accepted talks and speakers of the event"
            endpoint={`${origin}/api/v1/event/${eventId}?key=${apiKey}`}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

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
