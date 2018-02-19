import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'

import { getRouterParam } from 'store/reducers/router'
import eventCrud, { fetchUserEvents } from 'firebase/events'

export const createEvent = reaction(async (action, store, { form }) => {
  const createForm = form('event-create')
  const event = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create event into database
  const ref = await createForm.asyncSubmit(eventCrud.create, { ...event, owner: uid })
  // go to event page
  store.dispatch(push(`/organizer/event/${ref.id}`))
})

export const updateEvent = formName =>
  reaction((action, store, { form }) => {
    const updateForm = form(formName)
    const event = updateForm.getFormValues()
    // update event into database
    updateForm.asyncSubmit(eventCrud.update, event)
    // update event in store
    store.data.events.update(event)
  })

export const fetchEvent = reaction(async (action, store) => {
  const eventId = action.payload || getRouterParam('eventId')(store.getState())
  if (!eventId) return
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
