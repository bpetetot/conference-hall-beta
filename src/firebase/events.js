import firebase from 'firebase/app'

import crud from './crud'

export const fetchUserEvents = uid =>
  firebase
    .firestore()
    .collection('events')
    .where('owner', '==', uid)
    .get()

export default crud('events', 'id')
