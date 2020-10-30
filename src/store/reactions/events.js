import firebase from 'firebase/app'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import { fetchUserOrganizations } from 'firebase/organizations'
import eventCrud, {
  fetchPublicEvents,
  fetchUserEvents,
  fetchSettings,
  saveSettings,
} from 'firebase/events'

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

const fetchEventSettings = async (eventId, store) => {
  const settings = store.data.eventsSettings.get(eventId)
  if (!settings) {
    const settingsRef = await fetchSettings(eventId)
    if (settingsRef.exists) {
      store.data.eventsSettings.addOrUpdate(settingsRef.data())
    }
  }
}

export const fetchEvent = async (action, store) => {
  const { eventId, loadSettings = true } = action.payload
  if (!eventId) return
  // check if already in the store
  const current = store.data.events.get(eventId)
  if (current && current.id === eventId) return
  // fetch event from id
  const ref = await eventCrud.read(eventId)
  if (ref.exists) {
    store.data.events.add({ id: eventId, ...ref.data() })
    if (loadSettings) {
      await fetchEventSettings(eventId, store)
    }
  }
}

export const fetchOrganizationEvents = async (organizationId) => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('organization', '==', organizationId)
    .get()
  return result.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const fetchOrganizerEvents = async (action, store) => {
  const { userId } = action.payload
  let organizationsKeys = store.data.organizations.getKeys()
  if (!organizationsKeys.length) {
    const organizations = await fetchUserOrganizations(userId)
    store.data.organizations.set(organizations)
    organizationsKeys = store.data.organizations.getKeys()
  }

  const result = await fetchUserEvents(userId)
  const events = result.docs.map((ref) => ({ id: ref.id, ...ref.data() }))
  const organizationsEvents = await Promise.all(map(organizationsKeys, fetchOrganizationEvents))
  const aggregatedEvents = uniqBy(events.concat(flatten(organizationsEvents)), 'id')
  // set events in the store
  store.data.events.set(aggregatedEvents)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(aggregatedEvents)

  // fetch events settings
  await Promise.all(map(aggregatedEvents, (event) => fetchEventSettings(event.id, store)))
}

export const fetchSpeakerEvents = async (action, store) => {
  const result = await fetchPublicEvents()
  const events = result.docs.map((ref) => ({ id: ref.id, ...ref.data() }))
  // set events in the store
  store.data.events.set(events)
  // set events id to the organizer event store
  store.ui.speaker.myEvents.reset()
  store.ui.speaker.myEvents.set(events)
}

export const organizerChangeEvent = async (action, store) => {
  store.ui.organizer.proposals.reset()
  store.ui.organizer.proposalsPaging.reset()
  store.ui.organizer.proposalsSelection.reset()
}
