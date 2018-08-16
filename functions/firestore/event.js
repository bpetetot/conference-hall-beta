const admin = require('firebase-admin')

const getEvent = eventId =>
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(doc => doc.data())

const getEventProposals = (eventId, state) => {
  let query = admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('proposals')

  if (state) {
    query = query.where('state', '==', state)
  }

  return query.get()
    .then(result => result.docs.map(ref => Object.assign({ id: ref.id }, ref.data())))
}

module.exports = {
  getEvent,
  getEventProposals,
}
