/* eslint-disable comma-dangle */
const firebase = require('firebase-admin')
const { omit } = require('lodash')

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

module.exports = {
  addProposal,
  updateProposal,
  removeProposal,
}
