const express = require('express')
const withApiKey = require('../middlewares/apiKey')
const getEvent = require('./getEvent')

// router
const router = express.Router()

// Event APIs
router.get('/event/:eventId', withApiKey, getEvent)

module.exports = router
