const admin = require('firebase-admin')

const getEvent = eventId =>
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(doc => doc.data())

const getEventProposals = (eventId, state = 'accepted') =>
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')
    .where('state', '==', state)
    .get()
    .then(result => result.docs.map(ref => ref.data()))

module.exports = {
  getEvent,
  getEventProposals,
}
