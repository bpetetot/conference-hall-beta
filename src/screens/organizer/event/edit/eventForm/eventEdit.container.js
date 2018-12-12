import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import EventForm from '../../form'

const mapStore = (store, { eventId }) => {
  const { visibility, ...event } = store.data.events.get(eventId)
  return {
    organizations: store.data.organizations.getAsArray(),
    initialValues: {
      isPrivate: visibility !== 'public',
      ...event,
    },
    onSubmit: payload => store.dispatch({ type: '@@ui/ON_UPDATE_EVENT_DETAILS', payload }),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT'), //
  inject(mapStore), //
)(EventForm)
