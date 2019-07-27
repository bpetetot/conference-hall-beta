const has = require('lodash/has')

const { getEvent } = require('../../firestore/event')
const { isUserEvent } = require('../../firestore/permissions')
const { exportEventData } = require('../../firestore/exports')
const { printPDF } = require('./pdfCards')

module.exports = async (req, res) => {
  const { eventId } = req.params
  const { uid } = req.user
  const { output, ...filters } = req.query || {}

  const event = await getEvent(eventId)

  // check user permissions on event (owner & organization)
  const hasAccess = await isUserEvent(uid, event)
  if (!hasAccess) {
    res.status(401).send({ error: `Permission denied on event ${eventId}` })
  }

  try {
    const eventExport = await exportEventData(event, uid, filters, {
      event: ['name', 'categories', 'formats', 'address', 'conferenceDates'],
      proposal: [
        'title',
        'state',
        'level',
        'abstract',
        'categories',
        'formats',
        'speakers',
        'comments',
        'references',
        'rating',
        'loves',
        'hates',
        'language',
        'organizersThread',
      ],
      speaker: [
        'uid',
        'displayName',
        'bio',
        'speakerReferences',
        'company',
        'photoURL',
        'twitter',
        'github',
        'address',
        'language',
        'email',
        'phone',
      ],
    })

    if (has(eventExport, 'conferenceDates.start')) {
      eventExport.conferenceDates.start = eventExport.conferenceDates.start.toDate().toISOString()
    }

    if (has(eventExport, 'conferenceDates.end')) {
      eventExport.conferenceDates.end = eventExport.conferenceDates.end.toDate().toISOString()
    }

    if (output === 'pdf') {
      const pdf = await printPDF(eventExport)
      res.setHeader('Content-Type', 'application/pdf')
      res.send(pdf)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.send(JSON.stringify(eventExport))
    }
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    res.status(500).end()
  }
}
