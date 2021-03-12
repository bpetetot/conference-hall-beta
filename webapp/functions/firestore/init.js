const firebase = require('firebase-admin')

const initialize = () => {
  firebase.initializeApp()

  const firestore = firebase.firestore()
  firestore.settings({ timestampsInSnapshots: true })
}

module.exports = initialize
