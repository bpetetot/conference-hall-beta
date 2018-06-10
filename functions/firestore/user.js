const admin = require('firebase-admin')

const getUsers = uids =>
  Promise.all(uids.map(uid =>
    new Promise((resolve) => {
      admin
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          if (!doc.exists) return resolve()
          return resolve(doc.data())
        })
    })))

module.exports = {
  getUsers,
}
