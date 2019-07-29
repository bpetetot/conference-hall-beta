import firebase from 'firebase/app'

import crud from './crud'

export const fetchUserEvents = uid => firebase
  .firestore()
  .collection('events')
  .where('owner', '==', uid)
  .get()

export const fetchPublicEvents = () => firebase
  .firestore()
  .collection('events')
  .where('visibility', '==', 'public')
  .get()

export const fetchSettings = eventId => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('settings')
  .doc(eventId)
  .get()

export const saveSettings = (eventId, settings) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('settings')
  .doc(eventId)
  .set({ id: eventId, ...settings }, { merge: true })

export default crud('events', 'id')
