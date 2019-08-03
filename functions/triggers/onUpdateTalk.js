/* eslint-disable no-console */
const functions = require('firebase-functions')

const { updateProposal } = require('../firestore/proposal')
const { getEvent, getEventSettings } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const email = require('../email')
const talkConfirmed = require('../email/templates/talkConfirmed')
const talkDeclined = require('../email/templates/talkDeclined')
const { getEmailRecipients } = require('../helpers/event')

// onUpdateTalk is called when a talk is updated.
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
      console.info(`[${talk.id}] send email to confirmed or declined proposal`)

      // update state proposal
      await updateProposal(eventId, { id: talk.id, state })

      // Send email to organizers
      const { app, mailgun } = functions.config()

      const event = await getEvent(eventId)
      const settings = await getEventSettings(eventId)
      const uids = Object.keys(talk.speakers)
      const speakers = await getUsers(uids)
      const to = speakers.map(user => user.email)

      // send confirmation email to organizers
      if (state === 'confirmed') {
        const { cc, bcc } = await getEmailRecipients(event, settings, 'confirmed')
        await email.send(mailgun, {
          to,
          cc,
          bcc,
          subject: `[${event.name}] Talk confirmed by speaker`,
          html: talkConfirmed(event, talk, app),
          confName: event.name,
        })
      }

      // send decline email to organizers
      if (state === 'declined') {
        const { cc, bcc } = await getEmailRecipients(event, settings, 'declined')
        await email.send(mailgun, {
          to,
          cc,
          bcc,
          subject: `[${event.name}] Talk declined by speaker`,
          html: talkDeclined(event, talk, app),
          confName: event.name,
        })
      }
    }
  })
})
