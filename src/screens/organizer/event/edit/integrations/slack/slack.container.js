import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import Slack from './slack'

const mapStore = (store, { eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)
  const enabled = get(settings, 'slack.enabled')
  const webhookUrl = get(settings, 'slack.webhookUrl')
  const notifications = get(settings, 'slack.notifications')

  return {
    enabled,
    webhookUrl,
    notifications,
    onToggleSlack: (checked) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'slack',
          enabled: checked,
        },
      }),
    onSaveUrl: (url) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'slack',
          webhookUrl: url,
        },
      }),
    onChangeNotification: (e) =>
      store.dispatch({
        type: '@@ui/ON_SAVE_EVENT_SETTINGS',
        payload: {
          eventId,
          domain: 'slack',
          notifications: {
            ...notifications,
            [e.target.name]: e.target.checked,
          },
        },
      }),
  }
}

export default inject(mapStore)(Slack)
