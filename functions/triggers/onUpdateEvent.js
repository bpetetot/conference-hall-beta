const functions = require('firebase-functions')
const saveEvent = require('../algolia/event')

// onUpdateProposal is called when an event is updated.
// it will index the event in Algolia
module.exports = functions.firestore
  .document('events/{eventId}')
  .onUpdate((snap, context) => {
    const { eventId } = context.params
    const event = snap.after.data()
    return saveEvent(eventId, event)
  })
