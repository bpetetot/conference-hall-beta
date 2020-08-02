import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import EventForm from '../form'

const mapStore = (store, { userId }) => ({
  submitting: store.ui.loaders.get().isEventSaving,
  isCreateForm: true,
  organizations: store.data.organizations.getAsArray(),
  initialValues: {
    type: 'conference',
    visibility: true,
    conferenceDates: {},
  },
  onSubmit: (values) => {
    store.dispatch({
      type: '@@ui/ON_CREATE_EVENT',
      payload: {
        userId,
        data: {
          ...values,
          visibility: values.visibility ? 'private' : 'public',
        },
      },
    })
  },
})

export default compose(
  forRoute.absolute('organizer-event-create'), //
  inject(mapStore), //
)(EventForm)
