/* eslint-disable comma-dangle */
const firebase = require('firebase-admin')
const { omit, toLower, deburr } = require('lodash')


/**
 * Return the proposal with the given id
 * @param {string} eventId event id
 * @param {string} proposalId proposal id
 */
const fetchProposal = async (eventId, proposalId) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('proposals')
  .doc(proposalId)
  .get()
  .then(doc => doc.data())

const addProposal = (eventId, proposal) => {
  const newProposal = omit(proposal, 'submissions')
  const now = firebase.firestore.FieldValue.serverTimestamp()
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposal.id)
    .set({
      ...newProposal,
      rating: null,
      state: 'submitted',
      updateTimestamp: now,
      createTimestamp: now,
    })
}
const getProposal = (eventId, proposalId) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('proposals')
  .doc(proposalId)
  .get()
  .then(doc => doc.data())

const updateProposal = (eventId, proposal) => {
  const updatedProposal = omit(proposal, 'submissions')
  const now = firebase.firestore.FieldValue.serverTimestamp()
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposal.id)
    .update({ ...updatedProposal, updateTimestamp: now })
}

const removeProposal = (eventId, proposalId) => firebase
  .firestore()
  .collection('events')
  .doc(eventId)
  .collection('proposals')
  .doc(proposalId)
  .delete()

const getEventProposals = async (
  eventId,
  uid,
  {
    categories, formats, state, sortOrder, ratings, search
  } = {},
) => {
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
  if (state) {
    query = query.where('state', '==', state)
  }
  // add sortOrder
  if (sortOrder) {
    if (sortOrder === 'newest') {
      query = query.orderBy('createTimestamp', 'desc')
    } else if (sortOrder === 'oldest') {
      query = query.orderBy('createTimestamp', 'asc')
    } else if (sortOrder === 'highestRating') {
      query = query.orderBy('rating', 'desc')
    } else if (sortOrder === 'lowestRating') {
      query = query.orderBy('rating', 'asc')
    }
  }

  const result = await query.get()
  let proposals = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))

  // add search by title (client filter)
  if (search) {
    const searchQuery = deburr(toLower(search))
    proposals = proposals.filter(proposal => deburr(toLower(proposal.title)).includes(searchQuery))
  }

  // add ratings filter (client filter)
  if (ratings === 'rated') {
    proposals = proposals.filter(proposal => proposal.usersRatings && !!proposal.usersRatings[uid])
  } else if (ratings === 'notRated') {
    proposals = proposals.filter(proposal => !proposal.usersRatings || !proposal.usersRatings[uid])
  }

  return proposals
}

// Get the list of proposals for a given user and a given event.
const getEventUserProposals = async (
  eventId,
  userId,
) => {
  const query = firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')

  const result = await query.get()
  const proposals = result.docs.map(ref => ({ id: ref.id, ...ref.data() }))
  return proposals.filter(proposal => proposal.speakers[userId])
}

module.exports = {
  fetchProposal,
  addProposal,
  updateProposal,
  removeProposal,
  getEventProposals,
  getProposal,
  getEventUserProposals
}
