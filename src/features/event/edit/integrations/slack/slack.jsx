import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'
import { useOrganizerEvent, useUpdateEventField } from 'data/event'

import styles from './slack.module.css'

const Slack = ({ eventId }) => {
  const { data: event } = useOrganizerEvent(eventId)
  const [enabled, setEnabled] = useState(!!event.slackWebhookUrl)
  const [url, setUrl] = useState(event.slackWebhookUrl || '')
  const { mutate: saveWebhookUrl } = useUpdateEventField(eventId, 'slackWebhookUrl')
  const { mutate: saveSlackNotif } = useUpdateEventField(eventId, 'slackNotifSubmitted')

  return (
    <div className={cn(styles.form, 'card')}>
      <div className={styles.title}>
        <h3>
          <IconLabel icon="fa fa-slack" label="Slack" />
        </h3>
        <Toggle
          name="slackEnabled"
          checked={enabled}
          onChange={() => {
            if (enabled) saveWebhookUrl(null)
            setEnabled(!enabled)
          }}
          aria-label={enabled ? 'Disable Slack' : 'Enable Slack'}
        />
      </div>
      <small className={styles.subtitle}>
        With Slack integration you will be able to received notifications about speakers in a
        dedicated Slack channel. Follow the 3 steps of the{' '}
        <a href="https://api.slack.com/incoming-webhooks" target="_NEW">
          Slack documentation
        </a>{' '}
        to get the Incoming Web Hook URL and choose the channel.
      </small>
      {enabled && (
        <div className={styles.content}>
          <Label name="webhookUrl" label="Web hook URL" classNameInput={styles.input}>
            <input
              id="webhookUrl"
              type="text"
              defaultValue={event.slackWebhookUrl}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button onClick={() => saveWebhookUrl(url)}>Save Web hook URL</Button>
          </Label>
          <h4>Configure which notification you want to receive:</h4>
          <Checkbox
            name="submitted"
            label="Submitted proposals"
            info="Receive a message in the channel when a speaker submit a talk."
            onChange={(e) => saveSlackNotif(e.target.checked)}
            defaultChecked={event.slackNotifSubmitted}
            disabled={!url}
          />
        </div>
      )}
    </div>
  )
}

Slack.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default Slack
