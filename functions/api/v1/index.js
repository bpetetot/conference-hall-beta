const express = require('express')
const withApiKey = require('../middlewares/apiKey')
const getEvent = require('./getEvent')
const getDrafts = require('./getDrafts')

// router
const router = express.Router()

// Event APIs
router.get('/event/:eventId', withApiKey, getEvent)

// Temporary draft api
router.get('/drafts/:eventId', withApiKey, getDrafts)

module.exports = router
