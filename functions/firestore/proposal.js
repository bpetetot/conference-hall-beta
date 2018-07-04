const admin = require('firebase-admin')

const addProposal = (eventId, proposal) => {
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .doc(proposal.id)
    .set({
      ...proposal,
      rating: null,
      state: 'submitted',
      updateTimestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
}

module.exports = {
  addProposal,
}
