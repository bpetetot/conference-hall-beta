const has = require('lodash/has')
const { exportEventData } = require('../../firestore/exports')

module.exports = async (req, res) => {
  const { state } = req.query

  try {
    const eventExport = await exportEventData(
      res.locals.event,
      null,
      { state },
      {
        event: ['name', 'categories', 'formats', 'address', 'conferenceDates'],
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
      },
    )

    if (has(eventExport, 'conferenceDates.start')) {
      eventExport.conferenceDates.start = eventExport.conferenceDates.start.toDate().toISOString()
    }
    if (has(eventExport, 'conferenceDates.end')) {
      eventExport.conferenceDates.end = eventExport.conferenceDates.end.toDate().toISOString()
    }

    res.send(eventExport)
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
    res.status(500).end()
  }
}
