import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import EventForm from '../../form'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)

  return {
    submitting: store.ui.loaders.get().isEventSaving,
    organizations: store.data.organizations.getAsArray(),
    initialValues: { ...event },
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_EVENT_DETAILS', payload })
    },
  }
}

export default compose(
  forRoute.absolute('organizer-event-edit'), //
  inject(mapStore), //
)(EventForm)
