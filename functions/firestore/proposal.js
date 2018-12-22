/* eslint-disable comma-dangle */
const firebase = require('firebase-admin')
const { omit, toLower, deburr } = require('lodash')

const addProposal = (eventId, proposal) => {
  const newProposal = omit(proposal, 'submissions')
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
      updateTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
}

const updateProposal = (eventId, proposal) => {
  const updatedProposal = omit(proposal, 'submissions')
  return firebase
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposal.id)
    .update(updatedProposal)
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
      query = query.orderBy('updateTimestamp', 'desc')
    } else if (sortOrder === 'oldest') {
      query = query.orderBy('updateTimestamp', 'asc')
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

module.exports = {
  addProposal,
  updateProposal,
  removeProposal,
  getEventProposals,
}
