const admin = require('firebase-admin')

admin.initializeApp()

exports.onCreateProposal = require('./triggers/onCreateProposal')
exports.api = require('./api')
