import { reaction } from 'k-ramel'
import { startSubmit, stopSubmit, reset } from 'redux-form'
import { push } from 'redux-little-router'

import { getRouterParam } from 'store/reducers/router'
import eventCrud, { fetchUserEvents } from 'firebase/events'

export const createEvent = reaction(async (action, store) => {
  const FORM = 'event-create'
  const event = action.payload
  try {
    // indicate start submitting form
    store.dispatch(startSubmit(FORM))
    // get user id
    const { uid } = store.auth.get()
    // create event into database
    const ref = await eventCrud.create({ ...event, owner: uid })
    // reset form
    store.dispatch(reset(FORM))
    // set form submitted
    store.dispatch(stopSubmit(FORM))
    // go to event page
    store.dispatch(push(`/organizer/event/${ref.id}`))
  } catch (error) {
    store.dispatch(stopSubmit(FORM, { _error: error.message }))
    throw error
  }
})

export const updateEvent = form =>
  reaction(async (action, store) => {
    const event = action.payload
    try {
      // indicate start submitting form
      store.dispatch(startSubmit(form))
      // update event into database
      await eventCrud.update(event)
      // update event in store
      store.data.events.update(event)
      // set form submitted
      store.dispatch(stopSubmit(form))
    } catch (error) {
      store.dispatch(stopSubmit(form, { _error: error.message }))
      throw error
    }
  })

export const fetchEvent = reaction(async (action, store) => {
  const eventId = action.payload || getRouterParam('eventId')(store.getState())
  if (!eventId) return
  // reset and update
  store.dispatch({ type: '@@ui/ON_CHANGE_SPEAKER_APP_EVENT', payload: { eventId } })
  store.data.proposals.reset()
  // check if already in the store
  const current = store.data.events.get(eventId)
  if (current && current.id === eventId) return
  // fetch event from id
  const ref = await eventCrud.read(eventId)
  if (ref.exists) {
    store.data.events.add({ id: eventId, ...ref.data() })
  }
})

export const fetchOrganizerEvents = reaction(async (action, store) => {
  const { uid } = store.auth.get()
  const result = await fetchUserEvents(uid)
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  store.data.events.set(events)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(events)
})
