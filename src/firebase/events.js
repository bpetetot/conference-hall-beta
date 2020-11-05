import firebase from 'firebase/app'
import { eventConverter } from 'models/Event'
import { eventSettingsConverter } from 'models/EventSettings'

import crud from './crud'

export const fetchUserEvents = async (uid) => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('owner', '==', uid)
    .withConverter(eventConverter)
    .get()
  return result.docs.map((ref) => ref.data())
}

export const fetchOrganizationEvents = async (organizationId) => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('organization', '==', organizationId)
    .withConverter(eventConverter)
    .get()
  return result.docs.map((ref) => ref.data())
}

export const fetchPublicEvents = async () => {
  const result = await firebase
    .firestore()
    .collection('events')
    .where('visibility', '==', 'public')
    .withConverter(eventConverter)
    .get()
  return result.docs.map((ref) => ref.data())
}

export const fetchSettings = (eventId) =>
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('settings')
    .withConverter(eventSettingsConverter)
    .doc(eventId)
    .get()

export const createSettings = (eventId) =>
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('settings')
    .doc(eventId)
    .set({ id: eventId })

export const updateSettings = (eventId, settings) =>
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('settings')
    .doc(eventId)
    .update(settings)

export default crud('events', 'id', eventConverter)
