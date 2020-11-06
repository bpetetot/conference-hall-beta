import React from 'react'
import { useParams } from 'react-router-dom'
import cn from 'classnames'
import get from 'lodash/get'
import { v4 as uuid } from 'uuid'

import { useEventSettings, useSaveEventSettings } from 'features/event/useEventSettings'
import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import ApiCard from './apiCard'

import styles from './api.module.css'

const Api = () => {
  const { eventId } = useParams()
  const { data: settings } = useEventSettings(eventId)
  const [saveSettings] = useSaveEventSettings(eventId)

  const enabled = get(settings, 'api.enabled')
  const apiKey = get(settings, 'api.apiKey')

  const onGenerateKey = () => saveSettings({ 'api.apiKey': uuid() })
  const onActiveApi = (checked) =>
    saveSettings({ 'api.enabled': checked, 'api.apiKey': checked && !apiKey ? uuid() : apiKey })

  const { origin } = window.location
  return (
    <div className={cn(styles.form, 'card')}>
      <div className={styles.title}>
        <h3>
          <IconLabel icon="fa fa-code" label="HTTP API" />
        </h3>
        <Toggle name="apiEnabled" checked={enabled} onChange={onActiveApi} />
      </div>
      <small className={styles.subtitle}>
        Use the HTTP API if you want to connect a service to some Conference Hall event. Have a look
        at the Conference Hall{' '}
        <a href="https://contribute-conference-hall.netlify.com/" target="_NEW">
          API documentation
        </a>
        .
      </small>
      {enabled && (
        <div className={styles.content}>
          <Label name="apiKey" label="API key" classNameInput={styles.input}>
            <input type="text" value={apiKey} readOnly />
            <Button onClick={onGenerateKey} disabled={!enabled}>
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

export default Api
