const admin = require('firebase-admin')

const getSurveys = eventId =>
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .collection('surveys')
    .get()
    .then(result => result.docs.map(ref => ref.data()))

module.exports = {
  getSurveys,
}
