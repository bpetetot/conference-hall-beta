import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'

import './slack.css'

const Slack = ({
  enabled,
  webhookUrl,
  notifications,
  onToggleSlack,
  onSaveUrl,
  onChangeNotification,
}) => {
  const [url, setUrl] = useState(webhookUrl)

  return (
    <div className="api-form card">
      <div className="api-form-title">
        <h2>
          <IconLabel icon="fa fa-slack" label="Slack" />
        </h2>
        <Toggle name="slackEnabled" checked={enabled} onChange={onToggleSlack} />
      </div>
      <small className="api-form-subtitle">
        With Slack integration you will be able to received notifications about speakers in a
        dedicated Slack channel. Follow the 3 steps of the{' '}
        <a href="https://api.slack.com/incoming-webhooks" target="_NEW">
          Slack documentation
        </a>{' '}
        to get the Incoming Web Hook URL and choose the channel.
      </small>
      {enabled && (
        <div className="api-form-content">
          <Label name="apiKey" label="Web hook URL" className="generate-key-input">
            <input type="text" defaultValue={url} onChange={e => setUrl(e.target.value)} />
            <Button secondary onClick={() => onSaveUrl(url)}>
              Save Web hook URL
            </Button>
          </Label>
          <p>Configure which notification you want to receive:</p>
          <Checkbox
            name="submitted"
            label="Submitted proposals"
            info="Receive a message in the channel when a speaker submit a talk."
            onChange={onChangeNotification}
            value={notifications.submitted}
            disabled={!url}
          />
        </div>
      )}
    </div>
  )
}

Slack.propTypes = {
  enabled: PropTypes.bool,
  webhookUrl: PropTypes.string,
  notifications: PropTypes.object,
  onToggleSlack: PropTypes.func.isRequired,
  onSaveUrl: PropTypes.func.isRequired,
  onChangeNotification: PropTypes.func.isRequired,
}

Slack.defaultProps = {
  enabled: false,
  webhookUrl: undefined,
  notifications: {},
}

export default Slack
