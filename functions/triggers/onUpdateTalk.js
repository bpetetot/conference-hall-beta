const functions = require('firebase-functions')

const { updateProposal } = require('../firestore/proposal')
const { getEvent, getEventOrganizers } = require('../firestore/event')
const email = require('../email')
const talkConfirmed = require('../email/templates/talkConfirmed')
const talkDeclined = require('../email/templates/talkDeclined')

// onUpdateTalk is called when atalk is updated.
// If this update include a change is the submision.state, this is a confirmation of an accepted
// submission.
// To test this function online:
// > firebase functions:config:get > .runtimeconfig.json
// > firebase functions:shell
// > onUpdateTalk({before: {...}, after: {...}}, {params: {talkId: ".."}})
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

      // Send email to organizers
      const { app, mailgun } = functions.config()
      if (!app) {
        throw new Error('You must provide the app.url variable')
      }

      const event = await getEvent(eventId)
      const organizers = await getEventOrganizers(event)

      if (state === 'confirmed') {
        // send confirmation email to organizers
        await email.send(mailgun, {
          to: organizers.map(user => user.email),
          contact: event.contact,
          subject: `[${event.name}] Talk confirmed by speaker`,
          html: talkConfirmed(event, talk, app.url),
          confName: event.name,
        })
      }

      if (state === 'declined') {
        // send decline email to organizers
        await email.send(mailgun, {
          to: organizers.map(user => user.email),
          contact: event.contact,
          subject: `[${event.name}] Talk declined by speaker`,
          html: talkDeclined(event, talk, app.url),
          confName: event.name,
        })
      }
    }
  })
})
