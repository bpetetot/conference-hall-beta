const express = require('express')
const withApiKey = require('../middlewares/apiKey')
const getEvent = require('./getEvent')
const acceptProposal = require('./proposal/accept')
const rejectProposal = require('./proposal/reject')

// router
const router = express.Router()

// Event APIs
router.get('/event/:eventId', withApiKey, getEvent)

// Proposal deliberation API
router.put('/proposal/:eventId/:proposalId/accept', withApiKey, acceptProposal)
router.put('/proposal/:eventId/:proposalId/reject', withApiKey, rejectProposal)

module.exports = router
