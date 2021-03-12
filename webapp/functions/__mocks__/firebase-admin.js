const firebase = require('@firebase/testing')

const projectId = 'conference-hall'

const admin = firebase.initializeAdminApp({ projectId })

// set FieldValue commands in the mock
admin.firestore.FieldValue = firebase.firestore.FieldValue

module.exports = admin
