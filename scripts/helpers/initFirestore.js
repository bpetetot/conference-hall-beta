/* eslint-disable no-console */
const admin = require('firebase-admin')

// service account credentials (need to be downloaded from firebase console)
const serviceAccount = require('../serviceAccount.json')

console.log('Connect to firestore...')

if (!serviceAccount) {
  console.error(
    'You need the service account credentials (need to be downloaded from firebase console)',
  )
  process.exit(1)
}

// initialize app credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

console.log('Connected.')
