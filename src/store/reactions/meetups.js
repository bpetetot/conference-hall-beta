import { createMeetup, updateMeetup, removeMeetup, fetchEventMeetups } from 'firebase/meetups'

export const create = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')

  store.ui.loaders.update({ isMeetupSaving: true })
  const result = await createMeetup(eventId, action.payload)
  const ref = await result.get()
  store.ui.loaders.update({ isMeetupSaving: false })

  if (ref.exists) {
    store.data.meetups.add({ id: ref.id, ...ref.data() })
  }
}

export const update = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  const { id, data } = action.payload

  store.ui.loaders.update({ isMeetupSaving: true })
  await updateMeetup(eventId, id, data)
  store.ui.loaders.update({ isMeetupSaving: false })

  store.data.meetups.update(action.payload)
}

export const remove = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  const { id } = action.payload
  await removeMeetup(eventId, id)
  store.data.meetups.remove(id)
}

export const fetchMeetups = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')

  store.ui.loaders.update({ isFetchingMeetups: true })
  const meetups = await fetchEventMeetups(eventId)
  store.data.meetups.set(meetups)
  store.ui.loaders.update({ isFetchingMeetups: false })
}
