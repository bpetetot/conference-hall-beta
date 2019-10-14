const express = require('express')
const cors = require('cors')({ origin: true })

const withAuth = require('../middlewares/auth')
const exportEvent = require('./exportEvent')

// router
const router = express.Router()

router.use(cors)
router.use(withAuth)

// Export proposals
router.get('/export/:eventId', exportEvent)

module.exports = router
