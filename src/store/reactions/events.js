import flatten from 'lodash/flatten'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import { fetchOrganizationEvents } from 'firebase/organizations'
import eventCrud, {
  fetchPublicEvents,
  fetchUserEvents,
  fetchSettings,
  saveSettings,
} from 'firebase/events'

export const createEvent = async (action, store, { router }) => {
  const { uid } = store.auth.get()
  const eventData = action.payload
  const event = { ...eventData, owner: uid }

  store.ui.loaders.update({ isEventSaving: true })
  const ref = await eventCrud.create(event)
  store.ui.loaders.update({ isEventSaving: false })

  store.data.events.add({ id: ref.id, ...event })
  router.push('organizer-event-page', { eventId: ref.id })
}

export const updateEventForm = async (action, store) => {
  const event = action.payload

  store.ui.loaders.update({ isEventSaving: true })
  await eventCrud.update(event)
  store.ui.loaders.update({ isEventSaving: false })

  store.data.events.update(event)
}

export const updateEvent = (action, store) => {
  const { event } = action.payload
  store.data.events.update(event)
  eventCrud.update(event)
}

export const saveEventSettings = async (action, store) => {
  const { eventId, domain, ...newSettings } = action.payload
  const oldSettings = get(store.data.eventsSettings.get(eventId), domain, {})

  await saveSettings(eventId, { [domain]: newSettings })

  store.data.eventsSettings.update({
    id: eventId,
    [domain]: { ...oldSettings, ...newSettings },
  })
}

const fetchEventSettings = async (eventId, store, router) => {
  const isOrganizer = router.getParam('root') === 'organizer'
  if (!isOrganizer) return

  const settings = store.data.eventsSettings.get(eventId)
  if (!settings) {
    const settingsRef = await fetchSettings(eventId)
    if (settingsRef.exists) {
      store.data.eventsSettings.addOrUpdate(settingsRef.data())
    }
  }
}

export const fetchEvent = async (action, store, { router }) => {
  const eventId = action.payload || router.getParam('eventId')
  if (!eventId) return
  // check if already in the store
  const current = store.data.events.get(eventId)
  if (current && current.id === eventId) return
  // fetch event from id
  const ref = await eventCrud.read(eventId)
  if (ref.exists) {
    store.data.events.add({ id: eventId, ...ref.data() })
    // fetch event settings
    await fetchEventSettings(eventId, store, router)
  }
}

export const fetchOrganizerEvents = async (action, store, { router }) => {
  const { uid } = store.auth.get()
  const organizations = store.data.organizations.getKeys()

  const result = await fetchUserEvents(uid)
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  const organizationsEvents = await Promise.all(
    map(organizations, async (organizationId) => {
      const organizationEvents = await fetchOrganizationEvents(organizationId)
      return organizationEvents.docs.map(ref => ({ id: ref.id, ...ref.data() }))
    }),
  )
  const aggregatedEvents = uniqBy(events.concat(flatten(organizationsEvents)), 'id')
  // set events in the store
  store.data.events.set(aggregatedEvents)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(aggregatedEvents)

  // fetch events settings
  await Promise.all(map(aggregatedEvents, event => fetchEventSettings(event.id, store, router)))
}

export const fetchSpeakerEvents = async (action, store) => {
  const result = await fetchPublicEvents()
  const events = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  store.data.events.set(events)
  // set events id to the organizer event store
  store.ui.speaker.myEvents.reset()
  store.ui.speaker.myEvents.set(events)
}

export const organizerChangeEvent = async (action, store, { router }) => {
  const { eventId } = action.payload
  store.ui.organizer.proposals.reset()
  store.ui.organizer.proposalsPaging.reset()
  store.ui.organizer.proposalsSelection.reset()
  router.push('organizer-event-proposals', { eventId }, {})
}
