import React from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import ApiCard from './apiCard'

import './api.css'

const Api = ({
  eventId, enabled, apiKey, onActiveApi, onGenerateKey,
}) => {
  const { origin } = window.location
  return (
    <div className="api-form card">
      <div className="api-form-title">
        <h2>
          <IconLabel icon="fa fa-code" label="HTTP API" />
        </h2>
        <Toggle name="apiEnabled" checked={enabled} onChange={onActiveApi} />
      </div>
      <small className="api-form-subtitle">
        Use the HTTP API if you want to connect a service to some Conference Hall event. Have a look
        at the Conference Hall{' '}
        <a href="https://contribute-conference-hall.netlify.com/" target="_NEW">
          API documentation
        </a>
        .
      </small>
      {enabled && (
        <div className="api-form-content">
          <Label name="apiKey" label="API key" className="generate-key-input">
            <input type="text" value={apiKey} disabled />
            <Button secondary onClick={onGenerateKey} disabled={!enabled}>
              Generate API Key
            </Button>
          </Label>
          <ApiCard
            name="GET /api/v1/event/{id}"
            description="Expose formats, categories, proposals and speakers of the event"
            endpoint={`${origin}/api/v1/event/${eventId}?key=${apiKey}`}
          />
        </div>
      )}
    </div>
  )
}

Api.propTypes = {
  eventId: PropTypes.string.isRequired,
  enabled: PropTypes.bool,
  apiKey: PropTypes.string,
  onActiveApi: PropTypes.func.isRequired,
  onGenerateKey: PropTypes.func.isRequired,
}

Api.defaultProps = {
  enabled: false,
  apiKey: undefined,
}

export default Api
