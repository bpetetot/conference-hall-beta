import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import get from 'lodash/get'

import ApiForm from './api'

const mapStore = (store, { eventId }) => {
  const settings = store.data.eventsSettings.get(eventId)
  const enabled = get(settings, 'api.enabled')
  const apiKey = get(settings, 'api.apiKey')

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
