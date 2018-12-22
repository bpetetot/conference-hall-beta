/* eslint-disable no-underscore-dangle, prefer-destructuring, no-console */
const admin = require('firebase-admin')

/**
 * Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header
 * like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token content will be added as `req.user`.
 *
 * source: https://github.com/firebase/functions-samples/blob/master/authorized-https-endpoint/functions/index.js
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized')
    return
  }

  const idToken = authorization.split('Bearer ')[1]

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedIdToken) => {
      req.user = decodedIdToken
      return next()
    })
    .catch((error) => {
      console.error('Error while verifying Firebase ID token:', error)
      res.status(403).send('Unauthorized')
    })
}
