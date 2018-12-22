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

export default crud('events', 'id')
