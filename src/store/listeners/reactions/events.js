import { reaction } from 'k-ramel'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'

import { fetchOrganizationEvents } from 'firebase/organizations'
import eventCrud, { fetchEvents, fetchUserEvents } from 'firebase/events'

export const createEvent = reaction(async (action, store, { form, router }) => {
  const createForm = form('event-create')
  const event = createForm.getFormValues()
  // get user id
  const { uid } = store.auth.get()
  // create event into database
  const ref = await createForm.asyncSubmit(eventCrud.create, { ...event, owner: uid })
  // go to event page
  router.push(`/organizer/event/${ref.id}`)
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

export const fetchEvent = reaction(async (action, store, { router }) => {
  const eventId = action.payload || router.getRouteParam('eventId')
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
  const organizations = store.data.organizations.getKeys()

  const result = await fetchUserEvents(uid)
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  const organizationsEvents = await Promise.all(map(organizations, async (organizationId) => {
    const organizationEvents = await fetchOrganizationEvents(organizationId)
    return organizationEvents.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  }))
  const aggregatedEvents = uniqBy(events.concat(flatten(organizationsEvents)), 'id')
  // set events in the store
  store.data.events.set(aggregatedEvents)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(aggregatedEvents)
})

export const fetchSpeakerEvents = reaction(async (action, store) => {
  const result = await fetchEvents()
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  store.data.events.set(events)
  // set events id to the organizer event store
  store.ui.speaker.myEvents.reset()
  store.ui.speaker.myEvents.set(events)
})
