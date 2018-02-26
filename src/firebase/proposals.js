import firebase from 'firebase/app'

/**
 * Return the proposal with the given id
 * @param {string} eventId event id
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
 * @param {object} options options with filters and sorting
 */
export const fetchEventProposals = async (eventId, uid, { categories, formats, sorting } = {}) => {
  let query = firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')

  // add filters
  if (categories) {
    query = query.where('categories', '==', categories)
  }
  if (formats) {
    query = query.where('formats', '==', formats)
  }
  // add sorting
  if (sorting) {
    if (sorting === 'newest') {
      query = query.orderBy('updateTimestamp', 'desc')
    } else if (sorting === 'oldest') {
      query = query.orderBy('updateTimestamp', 'asc')
    } else if (sorting === 'highestRating') {
      query = query.orderBy('rating', 'desc')
    } else if (sorting === 'lowestRating') {
      query = query.orderBy('rating', 'asc')
    }
  }

  const result = await query.get()
  return result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
}

/**
 * Add a proposal to an event
 * @param {string} eventId event id
 * @param {object} submittedTalk submittedTalk data
 */
export const addProposal = (eventId, submittedTalk) => {
  const { submissions, ...copyTalk } = submittedTalk
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(submittedTalk.id)
    .set({
      ...copyTalk,
      rating: null,
      state: 'submitted',
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

/**
 * Remove a proposal from an event
 * @param {string} eventId event id
 * @param {string} talkId talk id
 */
export const removeProposal = async (eventId, talkId) => {
  await firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .delete()
}

export const updateProposal = (eventId, submittedTalk) => {
  const { submissions, ...copyTalk } = submittedTalk
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(submittedTalk.id)
    .update({
      ...copyTalk,
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

export const updateRating = (eventId, talkId, uid, ratingUpdated, rated) => {
  firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(talkId)
    .update({ ...ratingUpdated, [`usersRatings.${uid}`]: rated })
}
