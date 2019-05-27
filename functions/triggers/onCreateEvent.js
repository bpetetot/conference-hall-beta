const functions = require('firebase-functions')
const saveEvent = require('../algolia/event')

// onCreateProposal is called when an event is created
// it will index the event in Algolia
module.exports = functions.firestore
  .document('events/{eventId}')
  .onCreate(async (snap, context) => {
    const { eventId } = context.params
    const event = snap.data()
    return saveEvent(eventId, event)
  })
