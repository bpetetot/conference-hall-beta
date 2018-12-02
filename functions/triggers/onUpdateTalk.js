/* eslint-disable no-console */
const functions = require('firebase-functions')
const { updateProposal } = require('../firestore/proposal')

module.exports = functions.firestore.document('talks/{talkId}').onUpdate(async (snap) => {
  const previousTalk = snap.before.data()
  const talk = snap.after.data()

  const { submissions } = talk
  if (!submissions) return

  Object.keys(submissions).forEach(async (eventId) => {
    const { state } = submissions[eventId]
    const previousSubmittedTalk = previousTalk.submissions.eventId

    // Check if a submission has been confirmed or declined
    if ((state === 'confirmed' || state === 'declined') && state !== previousSubmittedTalk.state) {
      // update state proposal
      await updateProposal(eventId, { id: talk.id, state })
    }
  })
})
