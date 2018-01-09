import firebase from 'firebase/app'
import crud from 'sagas/firebase/crud'

const talksCrud = crud('talks', 'id')

/**
 * Fetch all talks of a user
 * @param {string} uid user id
 */
export const fetchUserTalks = async (uid) => {
  const result = await firebase
    .firestore()
    .collection('talks')
    .where(`speakers.${uid}`, '==', true)
    .get()
  return result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
}

/**
 * Save all data needed when submitting to an event
 * @param {*} talkId talk id
 * @param {*} eventId event id
 * @param {*} data data asked to the user about the submission
 */
export const saveTalkSubmission = async (talkId, eventId, data) => {
  const db = firebase.firestore()
  const batch = db.batch()

  // add submission to talk
  talksCrud.update({ id: talkId, [`submissions.${eventId}`]: data })

  // add proposal to event
  db
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .set({ talkId, ...data })

  await batch.commit()
}

export default talksCrud
