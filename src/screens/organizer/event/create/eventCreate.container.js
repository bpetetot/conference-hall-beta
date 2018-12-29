import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import EventForm from '../form'

const mapStore = store => ({
  submitting: store.ui.loaders.get().isEventSaving,
  isCreateForm: true,
  organizations: store.data.organizations.getAsArray(),
  initialValues: {
    type: 'conference',
    visibility: 'private',
    conferenceDates: {},
  },
  onSubmit: (payload) => {
    store.dispatch({ type: '@@ui/ON_CREATE_EVENT', payload })
  },
})

export default compose(
  forRoute.absolute('organizer-event-create'), //
  inject(mapStore), //
)(EventForm)
