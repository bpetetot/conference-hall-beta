import firebase from 'firebase/compat/app'

/**
 * Return the user survey for an event
 * @param {string} eventId event id
 * @param {string} uid user id
 */
export const getSurvey = (eventId, uid) =>
  firebase.firestore().collection('events').doc(eventId).collection('surveys').doc(uid).get()

/**
 * Add or update a user survey to an event
 * @param {string} eventId event id
 * @param {string} uid user id
 * @param {object} survey
 */
export const saveSurvey = (eventId, uid, survey) =>
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('surveys')
    .doc(uid)
    .set({
      uid,
      ...survey,
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
