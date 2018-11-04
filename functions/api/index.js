const functions = require('firebase-functions')
const express = require('express')
const routerV1 = require('./v1')

// configure express server
const app = express()

// API router v1
app.use('/api/v1', routerV1)

module.exports = functions.https.onRequest(app)
