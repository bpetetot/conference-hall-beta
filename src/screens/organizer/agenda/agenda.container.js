import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Agenda from './agenda'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    isMeetup: event.type === 'meetup',
  }
}

export default compose(
  inject(mapStore),
  forRoute('organizer-event-agenda'),
)(Agenda)
