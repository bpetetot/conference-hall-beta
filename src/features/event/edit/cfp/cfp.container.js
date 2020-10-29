import { inject } from '@k-ramel/react'

import CFPForm from './cfp'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)
  return {
    submitting: store.ui.loaders.get().isEventSaving,
    type: event && event.type,
    initialValues: event,
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_EVENT_CFP', payload })
    },
  }
}

export default inject(mapStore)(CFPForm)
