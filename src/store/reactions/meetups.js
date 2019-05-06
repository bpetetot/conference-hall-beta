import { createMeetup } from 'firebase/meetups'

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
