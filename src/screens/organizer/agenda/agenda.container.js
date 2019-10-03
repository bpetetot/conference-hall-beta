import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'

import Agenda from './agenda'

const mapStore = (store, props, { router }) => {
  const eventId = router.getParam('eventId')
  const event = store.data.events.get(eventId)
  return {
    loaded: !store.ui.loaders.get().isFetchingMeetups,
    isMeetup: event.type === 'meetup',
    meetups: store.data.meetups.getAsArray(),
    load: () => store.dispatch('@@ui/ON_LOAD_MEETUPS'),
  }
}

export default compose(
  inject(mapStore),
  forRoute('organizer-event-agenda'),
  loader,
)(Agenda)
