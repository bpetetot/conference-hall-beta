import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { v4 as uuid } from 'uuid'

import Button from 'components/button'
import IconLabel from 'components/iconLabel'
import Label from 'components/form/label'
import Toggle from 'components/form/toggle'
import { useUpdateEventField } from 'data/event'

import ApiCard from './apiCard'
import styles from './api.module.css'

const Api = ({ event }) => {
  const [enabled, setEnabled] = useState(!!event.apiKey)
  const { mutate: saveApiKey } = useUpdateEventField(event.id, 'apiKey')
  const { origin } = window.location

  return (
    <div className={cn(styles.form, 'card')}>
      <div className={styles.title}>
        <h3>
          <IconLabel icon="fa fa-code" label="HTTP API" />
        </h3>
        <Toggle
          name="apiEnabled"
          checked={enabled}
          onChange={() => {
            if (enabled) saveApiKey(null)
            setEnabled(!enabled)
          }}
          aria-label={enabled ? 'Disable API' : 'Enable API'}
        />
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
            <input id="apiKey" type="text" value={event.apiKey || ''} readOnly />
            <Button onClick={() => saveApiKey(uuid())} disabled={!enabled}>
              Generate API Key
            </Button>
          </Label>
          <ApiCard
            name="GET /api/v1/event/{id}"
            description="Expose formats, categories, proposals and speakers of the event"
            endpoint={`${origin}/api/v1/event/${event.id}?key=${event.apiKey}`}
          />
        </div>
      )}
    </div>
  )
}

Api.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Api
