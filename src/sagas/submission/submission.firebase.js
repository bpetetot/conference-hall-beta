/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'

import talksCrud from '../talks/talks.firebase'

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
