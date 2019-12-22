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
const { validateInvite } = require('./direct/invite')
const { leaveOrganization } = require('./direct/organization')
const { delivered } = require('./email/emailWebhooks')

exports.submitTalk = submitTalk
exports.unsubmitTalk = unsubmitTalk
exports.delivered = delivered
exports.validateInvite = validateInvite
exports.leaveOrganization = leaveOrganization
