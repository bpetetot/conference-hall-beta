const functions = require('firebase-functions')

const { getUser } = require('../firestore/user')
const { getEvent } = require('../firestore/event')
const { exportEventData } = require('../firestore/exports')

const exportEvent = async ({ eventId }, context) => {
  const user = await getUser(context.auth.uid)

  console.log(user)

  const event = await getEvent(eventId)
  // TODO check user permissions on event (owner & organization)

  const filters = {}
  // TODO apply given filters

  const eventJson = await exportEventData(event, filters, {
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

  return eventJson
}

module.exports = {
  exportEvent: functions.https.onCall(exportEvent),
}
