import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'
import format from 'date-fns/format'

import Agenda from './agenda'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    isMeetup: event.type === 'meetup',
    createMeetup: date => router.push('organizer-create-meetup', { eventId }, { date: format(date, 'YYYY-MM-DD') }),
  }
}

export default compose(
  inject(mapStore),
  forRoute('organizer-event-agenda'),
)(Agenda)
