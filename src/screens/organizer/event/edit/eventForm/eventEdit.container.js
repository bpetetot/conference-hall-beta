import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { formValueSelector } from 'redux-form'
import { forRoute } from '@k-redux-router/react-k-ramel'

import EventForm from '../../form'

const FORM_NAME = 'event-edit'
const select = formValueSelector(FORM_NAME)

const mapStore = (store, { eventId }) => {
  const { visibility, ...event } = store.data.events.get(eventId)
  return {
    form: FORM_NAME,
    type: select(store.getState(), 'type'),
    initialValues: {
      isPrivate: visibility !== 'public',
      ...event,
    },
    organizations: store.data.organizations.getAsArray(),
    onSubmit: () => store.dispatch('@@ui/ON_UPDATE_EVENT_DETAILS'),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT'), //
  inject(mapStore), //
)(EventForm)
