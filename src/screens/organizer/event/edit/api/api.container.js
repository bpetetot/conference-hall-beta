import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import ApiForm from './api'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId) || {}
  const { apiActive, apiKey } = event
  return {
    apiActive,
    apiKey,
    onActiveApi: e => store.dispatch({
      type: '@@ui/ON_TOGGLE_EVENT_API',
      payload: {
        event: {
          id: eventId,
          apiActive: e.target.checked,
          apiKey,
        },
      },
    }),
    onGenerateKey: () => store.dispatch({
      type: '@@ui/ON_GENERATE_EVENT_API_KEY',
      payload: { eventId },
    }),
  }
}

export default compose(forRoute.absolute('EDIT_EVENT_API'), inject(mapStore))(ApiForm)
