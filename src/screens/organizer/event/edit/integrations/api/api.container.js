import { inject } from '@k-ramel/react'
import get from 'lodash/get'
import uuid from 'uuid/v4'

import Api from './api'

const mapStore = (store, { eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)
  const enabled = get(settings, 'api.enabled')
  const apiKey = get(settings, 'api.apiKey')

  return {
    enabled,
    apiKey,
    onActiveApi: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'api',
          enabled: checked,
          apiKey: checked && !apiKey ? uuid() : apiKey,
        },
      }),
    onGenerateKey: () =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'api',
          apiKey: uuid(),
        },
      }),
  }
}

export default inject(mapStore)(Api)
