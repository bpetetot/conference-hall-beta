const express = require('express')
const cookieParser = require('cookie-parser')()
const cors = require('cors')({ origin: true })

const withAuth = require('../middlewares/auth')
const exportEvent = require('./exportEvent')

// router
const router = express.Router()

router.use(cors)
router.use(cookieParser)
router.use(withAuth)

// Event APIs
router.get('/export/:eventId', exportEvent)

module.exports = router
