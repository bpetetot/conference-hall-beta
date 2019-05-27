const initialize = require('./firestore/init')

initialize()

// functions for triggered events calls
exports.onCreateEvent = require('./triggers/onCreateEvent')
exports.onUpdateEvent = require('./triggers/onUpdateEvent')
exports.onCreateProposal = require('./triggers/onCreateProposal')
exports.onUpdateProposal = require('./triggers/onUpdateProposal')
exports.onUpdateTalk = require('./triggers/onUpdateTalk')

// functions for HTTP APIs
exports.api = require('./api')

// functions for direct calls
const { submitTalk, unsubmitTalk } = require('./direct/submission')

exports.submitTalk = submitTalk
exports.unsubmitTalk = unsubmitTalk
