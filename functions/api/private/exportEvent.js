const { getEvent } = require('../../firestore/event')
const { isUserEvent } = require('../../firestore/permissions')
const { exportEventData } = require('../../firestore/exports')

module.exports = async (req, res) => {
  const { eventId } = req.params
  const { uid } = req.user
  const filters = req.query

  const event = await getEvent(eventId)

  // check user permissions on event (owner & organization)
  const hasAccess = await isUserEvent(uid, event)
  if (!hasAccess) {
    res.status(401).send({ error: `Permission denied on event ${eventId}` })
  }

  try {
    const eventJson = await exportEventData(event, uid, filters, {
      event: ['id', 'name', 'categories', 'formats'],
      proposal: [
        'id',
        'title',
        'state',
        'level',
        'abstract',
        'categories',
        'formats',
        'speakers',
        'comments',
      ],
      speaker: ['uid', 'displayName', 'bio', 'company', 'photoURL', 'twitter', 'github'],
    })

    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(eventJson))
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    res.status(500).end()
  }
}
