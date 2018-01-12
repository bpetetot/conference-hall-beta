/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'

/**
 * Fetch all proposals of an event
 * @param {string} eventId event id
 */
export const fetchEventProposals = async (eventId) => {
  const result = await firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .get()
  return result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
}
