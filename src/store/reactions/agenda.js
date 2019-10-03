import firebase from 'firebase/app'

/**
 * Add an agenda to a specific event
 * @param {string} eventId event id
 * @param {object} agenda
 */
// eslint-disable-next-line import/prefer-default-export
export const createAgenda = (eventId, data) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('agenda')
  .add({
    ...data,
    createTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  })
