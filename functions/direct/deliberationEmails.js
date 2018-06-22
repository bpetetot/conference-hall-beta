const functions = require('firebase-functions')

const sendToAccepted = functions.https.onCall((data) => {
  console.log(data)
})

module.exports = {
  sendToAccepted,
}
