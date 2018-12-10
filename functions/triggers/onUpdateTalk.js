const functions = require('firebase-functions')
const { updateProposal } = require('../firestore/proposal')

module.exports = functions.firestore.document('talks/{talkId}').onUpdate(async (snap) => {
  const previousTalk = snap.before.data()
  const talk = snap.after.data()

  if (!talk.submissions || !previousTalk.submissions) return

  Object.keys(talk.submissions).forEach(async (eventId) => {
    const { state } = talk.submissions[eventId]
    const previousSubmittedTalk = previousTalk.submissions[eventId]

    // Check if a submission has been confirmed or declined
    if ((state === 'confirmed' || state === 'declined') && state !== previousSubmittedTalk.state) {
      // update state proposal
      await updateProposal(eventId, { id: talk.id, state })
    }
  })
})
