import { createMeetup, fetchEventMeetups } from 'firebase/meetups'

// eslint-disable-next-line import/prefer-default-export
export const create = async (action, store, { router }) => {
  const data = action.payload
  const eventId = router.getParam('eventId')

  store.ui.loaders.update({ isMeetupSaving: true })
  const ref = await createMeetup(eventId, data)
  store.ui.loaders.update({ isMeetupSaving: false })

  if (ref.exists) {
    store.data.meetups.add(ref.data())
  }

  router.push('organizer-event-agenda', { eventId })
}

export const fetchMeetups = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')

  store.ui.loaders.update({ isFetchingMeetups: true })
  const meetups = await fetchEventMeetups(eventId)
  store.data.meetups.set(meetups)
  store.ui.loaders.update({ isFetchingMeetups: false })
}
