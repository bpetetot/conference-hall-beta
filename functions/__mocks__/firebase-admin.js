const firebase = require('@firebase/testing')

const projectId = 'conference-hall'

module.exports = firebase.initializeAdminApp({ projectId })
