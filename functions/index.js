const initialize = require('./firestore/init')

initialize()

// functions for triggered events calls
exports.onCreateProposal = require('./triggers/onCreateProposal')

// functions for HTTP APIs
exports.api = require('./api')

// functions for direct calls
const { submitTalk, unsubmitTalk } = require('./direct/submission')

exports.submitTalk = submitTalk
exports.unsubmitTalk = unsubmitTalk
