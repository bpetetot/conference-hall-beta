const express = require('express')
const checkApiKey = require('../middlewares/apiKey')
const getEventProposals = require('./getEventProposals')

// router
const router = express.Router()

// Event APIs
router.get('/event/:eventId/proposals', checkApiKey, getEventProposals)

module.exports = router
