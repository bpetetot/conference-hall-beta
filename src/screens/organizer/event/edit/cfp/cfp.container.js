import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

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

export default compose(
  forRoute.absolute('organizer-event-edit-cfp'),
  inject(mapStore),
)(CFPForm)
