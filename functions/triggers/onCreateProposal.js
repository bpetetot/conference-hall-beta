/* eslint-disable no-console */
const functions = require('firebase-functions')

const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')

const email = require('../email')
const talkSubmitted = require('../email/templates/talkSubmitted')
const talkReceived = require('../email/templates/talkReceived')
const { getEventEmails } = require('../helpers/eventEmails')

// onCreateProposal is called when a talk is submitted. A new submission is created and
// an email is sent to the speaker for a confirmation of her submission.
// To test this function online:
// > firebase functions:config:get > .runtimeconfig.json
// > firebase functions:shell
// > onCreateProposal({...},  {params:{eventId: "...", proposalId: '...'}})
module.exports = functions.firestore
  .document('events/{eventId}/proposals/{proposalId}')
  .onCreate(async (snap, context) => {
    const talk = snap.data()
    const { eventId } = context.params
    const { app, mailgun } = functions.config()

    const event = await getEvent(eventId)

    // Send email to speaker after submission
    const users = await getUsers(Object.keys(talk.speakers))
    await email.send(mailgun, {
      to: users.map(user => user.email),
      subject: `[${event.name}] Talk submitted`,
      html: talkSubmitted(event, talk, app),
      confName: event.name,
    })

    // Send email to organizers after submission
    const { cc, bcc } = await getEventEmails(event, 'submitted')
    if (cc || bcc) {
      await email.send(mailgun, {
        cc,
        bcc,
        subject: `[${event.name}] Talk received`,
        html: talkReceived(event, talk, app),
        confName: event.name,
      })
    }
  })
