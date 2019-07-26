const functions = require('firebase-functions')
const express = require('express')
const routerV1 = require('./v1')
const routerPrivate = require('./private')

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB',
}

// configure express server
const app = express()

// API router v1
app.use('/api/v1', routerV1)

// API privates and authenticated
app.use('/api/private', routerPrivate)

module.exports = functions.runWith(runtimeOpts).https.onRequest(app)
