import firebase from 'firebase/app'

export const createEvent = (event, userId) =>
  firebase
    .firestore()
    .collection('events')
    .add({
      ...event,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      owner: userId,
    })

export const updateEvent = ({ id, ...event }) => firebase
  .firestore()
  .collection('events')
  .doc(id)
  .set(event)

export const fetchEvent = id =>
  firebase
    .firestore()
    .collection('events')
    .doc(id)
    .get()
