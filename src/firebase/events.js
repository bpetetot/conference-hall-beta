import firebase from 'firebase/app'
import { eventConverter } from 'models/Event'
import { eventSettingsConverter } from 'models/EventSettings'

import crud from './crud'

export const fetchUserEvents = (uid) =>
  firebase.firestore().collection('events').where('owner', '==', uid).get()

export const fetchPublicEvents = () =>
  firebase.firestore().collection('events').where('visibility', '==', 'public').get()

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
