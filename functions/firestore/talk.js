const admin = require('firebase-admin')

const getAllTalks = () =>
  admin
    .firestore()
    .collection('talks')
    .get()
    .then(result => result.docs.map(ref => Object.assign({ id: ref.id }, ref.data())))

module.exports = {
  getAllTalks,
}
