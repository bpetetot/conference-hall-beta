const admin = require('firebase-admin')

admin.initializeApp()

const { sendToAccepted } = require('./direct/deliberationEmails')

// functions for triggered events calls
exports.onCreateProposal = require('./triggers/onCreateProposal')

// functions for http calls
exports.api = require('./api')

// functions for direct calls
exports.sendToAccepted = sendToAccepted
