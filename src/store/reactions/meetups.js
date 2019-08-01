import {
  createMeetup,
  updateMeetup,
  removeMeetup,
  fetchEventMeetups,
} from 'firebase/meetups'

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
}

export const update = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  const data = action.payload

  store.ui.loaders.update({ isMeetupSaving: true })
  await updateMeetup(eventId, data)
  store.ui.loaders.update({ isMeetupSaving: false })

  store.data.meetups.update(data)
}

export const remove = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  const { id } = action

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
