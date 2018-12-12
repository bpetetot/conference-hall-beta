import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import CFPForm from './cfp'

const mapStore = (store, { eventId }) => {
  const event = store.data.events.get(eventId)
  return {
    type: event && event.type,
    initialValues: event,
    onSubmit: payload => store.dispatch({ type: '@@ui/ON_UPDATE_EVENT_CFP', payload }),
  }
}

export default compose(
  forRoute.absolute('EDIT_EVENT_CFP'),
  inject(mapStore),
)(CFPForm)
