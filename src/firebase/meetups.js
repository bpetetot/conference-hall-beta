import firebase from 'firebase/app'

/**
 * Add or update a user survey to an event
 * @param {string} eventId event id
 * @param {string} uid user id
 * @param {object} survey
 */
export const createMeetup = (eventId, data) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('meetups')
  .add({
    ...data,
    createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
