import firebase from 'firebase/app'
import flatten from 'lodash/flatten'
import map from 'lodash/map'
import uniqBy from 'lodash/uniqBy'

import { fetchUserOrganizations } from 'firebase/organizations'
import { fetchPublicEvents, fetchUserEvents } from 'firebase/events'

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
  const organizations = await fetchUserOrganizations(userId)
  const organizationsKeys = organizations.map((orga) => orga.id)

  const result = await fetchUserEvents(userId)
  const events = result.docs.map((ref) => ({ id: ref.id, ...ref.data() }))
  const organizationsEvents = await Promise.all(map(organizationsKeys, fetchOrganizationEvents))
  const aggregatedEvents = uniqBy(events.concat(flatten(organizationsEvents)), 'id')
  // set events in the store
  store.data.events.set(aggregatedEvents)
  // set events id to the organizer event store
  store.ui.organizer.myEvents.reset()
  store.ui.organizer.myEvents.set(aggregatedEvents)
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
