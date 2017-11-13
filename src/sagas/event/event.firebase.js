import firebase from 'firebase/app'

export const createEvent = (data, userId) =>
  firebase
    .firestore()
    .collection('events')
    .add({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      owner: userId,
    })

export const fetchEvent = id =>
  firebase
    .firestore()
    .collection('events')
    .doc(id)
    .get()
