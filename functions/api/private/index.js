const express = require('express')
const cors = require('cors')({ origin: true })

const withAuth = require('../middlewares/auth')
const exportEvent = require('./exportEvent')
const acceptProposal = require('./proposal/accept')
const rejectProposal = require('./proposal/reject')

// router
const router = express.Router()

router.use(cors)
router.use(withAuth)

// Export proposals
router.get('/export/:eventId', exportEvent)

// Proposal deliberation API
router.get('/proposal/:eventId/:proposalId/accept', acceptProposal)
router.get('/proposal/:eventId/:proposalId/reject', rejectProposal)

module.exports = router
