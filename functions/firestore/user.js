const admin = require('firebase-admin')

const getUser = uid => admin
  .firestore()
  .collection('users')
  .doc(uid)
  .get()

const getUsers = uids => Promise.all(
  uids.map(
    uid => new Promise((resolve) => {
      getUser(uid).then((doc) => {
        if (!doc.exists) return resolve()
        return resolve(doc.data())
      })
    }),
  ),
)

module.exports = {
  getUser,
  getUsers,
}
