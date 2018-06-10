/* eslint-disable prefer-promise-reject-errors */
const { getEvent } = require('../../firestore/event')

module.exports = (req, res, next) => {
  const { key } = req.query
  const { eventId } = req.params

  if (!key) {
    return res.status(403).send({ error: 'API key mandatory' })
  }

  return getEvent(eventId).then((data) => {
    if (!data) {
      res.status(404).send({ error: 'Event not found' })
    } else if (!data.apiActive) {
      res.status(403).send({ error: 'Event API disabled' })
    } else if (data.apiKey !== key) {
      res.status(403).send({ error: 'Invalid API key' })
    } else {
      next()
    }
  })
}
