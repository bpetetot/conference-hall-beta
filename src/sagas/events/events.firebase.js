/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'

export const fetchUserEvents = uid =>
  firebase
    .firestore()
    .collection('events')
    .where('owner', '==', uid)
    .get()
