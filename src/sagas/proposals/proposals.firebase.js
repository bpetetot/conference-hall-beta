/* eslint-disable import/prefer-default-export */
import firebase from 'firebase/app'

/**
 * Return the proposal with the given id
 * @param {string} proposalId proposal id
 */
export const fetchProposal = (eventId, proposalId) =>
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposalId)
    .get()

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

/**
 * Add a proposal to an event
 * @param {string} eventId event id
 * @param {object} talk talk data to copy
 * @param {object} talkDataForEvent talk data for event
 */
export const addProposal = (eventId, talk, talkDataForEvent) => {
  const { submissions, ...copyTalk } = talk
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talk.id)
    .set({
      ...copyTalk,
      ...talkDataForEvent,
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const updateProposal = (eventId, talk, talkDataForEvent) => {
  const { submissions, ...copyTalk } = talk
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talk.id)
    .update({
      ...copyTalk,
      ...talkDataForEvent,
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const updateRating = (eventId, talkId, uid, ratingObject, totalRating) => {
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .update({
      rating: totalRating,
      [`ratings.${uid}`]: ratingObject,
    })
}
