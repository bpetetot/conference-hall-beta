import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import ApiForm from './api'

const mapStore = (store, { eventId }) => {
  const { api } = store.data.eventsSettings.get(eventId) || {}
  const { enabled, apiKey } = api || {}
  return {
    enabled,
    apiKey,
    onActiveApi: checked => store.dispatch({
      type: '@@ui/ON_TOGGLE_EVENT_API',
      payload: {
        eventId,
        enabled: checked,
        apiKey,
      },
    }),
    onGenerateKey: () => store.dispatch({
      type: '@@ui/ON_GENERATE_EVENT_API_KEY',
      payload: { eventId },
    }),
  }
}

export default compose(
  forRoute.absolute('organizer-event-edit-integrations'),
  inject(mapStore),
)(ApiForm)
