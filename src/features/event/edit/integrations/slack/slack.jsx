import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import get from 'lodash/get'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import Checkbox from 'components/form/checkbox'
import { useEventSettings, useSaveEventSettings } from 'features/event/useEventSettings'

import styles from './slack.module.css'

const Slack = () => {
  const { eventId } = useParams()
  const { data: settings } = useEventSettings(eventId)
  const [saveSettings] = useSaveEventSettings(eventId)

  const enabled = get(settings, 'slack.enabled')
  const notifications = get(settings, 'slack.notifications', {})
  const [url, setUrl] = useState(get(settings, 'slack.webhookUrl'))

  const onToggleSlack = (checked) => saveSettings({ 'slack.enabled': checked })
  const onSaveUrl = (webhookUrl) => saveSettings({ 'slack.webhookUrl': webhookUrl })
  const onChangeNotification = (e) =>
    saveSettings({ [`slack.notifications.${e.target.name}`]: e.target.checked })

  return (
    <div className={cn(styles.form, 'card')}>
      <div className={styles.title}>
        <h3>
          <IconLabel icon="fa fa-slack" label="Slack" />
        </h3>
        <Toggle name="slackEnabled" checked={enabled} onChange={onToggleSlack} />
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
            <input type="text" defaultValue={url} onChange={(e) => setUrl(e.target.value)} />
            <Button onClick={() => onSaveUrl(url)}>Save Web hook URL</Button>
          </Label>
          <h4>Configure which notification you want to receive:</h4>
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

export default Slack
