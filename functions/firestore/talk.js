/* eslint-disable comma-dangle */
const admin = require('firebase-admin')

const getTalk = talkId => admin
  .firestore()
  .collection('talks')
  .doc(talkId)
  .get()
  .then(doc => doc.data())

const updateTalk = (talkId, data) => admin
  .firestore()
  .collection('talks')
  .doc(talkId)
  .update(Object.assign(
    data,
    { updateTimestamp: admin.firestore.FieldValue.serverTimestamp() }
  ))

const getAllTalks = () => admin
  .firestore()
  .collection('talks')
  .get()
  .then(result => result.docs.map(ref => Object.assign({ id: ref.id }, ref.data())))

module.exports = {
  getTalk,
  getAllTalks,
  updateTalk,
}
