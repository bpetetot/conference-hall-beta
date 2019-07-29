/* eslint-disable prefer-promise-reject-errors */
const { get } = require('lodash')
const { getEvent, getEventSettings } = require('../../firestore/event')

module.exports = async (req, res, next) => {
  const { key } = req.query
  const { eventId } = req.params

  if (!key) {
    return res.status(403).send({ error: 'API key mandatory' })
  }

  const settings = await getEventSettings(eventId)

  return getEvent(eventId).then((data) => {
    if (!data) {
      res.status(404).send({ error: 'Event not found' })
    } else if (!get(settings, 'api.enabled')) {
      res.status(403).send({ error: 'Event API disabled' })
    } else if (get(settings, 'api.apiKey') !== key) {
      res.status(403).send({ error: 'Invalid API key' })
    } else {
      res.locals.event = data
      next()
    }
  })
}
