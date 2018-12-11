const admin = require('firebase-admin')

const getEvent = eventId => admin
  .firestore()
  .collection('events')
  .doc(eventId)
  .get()
  .then(doc => doc.data())

module.exports = {
  getEvent,
}
