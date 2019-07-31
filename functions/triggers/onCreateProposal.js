/* eslint-disable no-console */
const functions = require('firebase-functions')

const eventFirestore = require('../firestore/event')
const { getUsers } = require('../firestore/user')

const email = require('../email')
const talkSubmitted = require('../email/templates/talkSubmitted')
const talkReceived = require('../email/templates/talkReceived')
const { getEmailRecipients } = require('../helpers/event')
const { sendSlackMessage } = require('../slack')

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

    const event = await eventFirestore.getEvent(eventId)
    const settings = await eventFirestore.getEventSettings(eventId)

    // Send email to speaker after submission
    const speakers = await getUsers(Object.keys(talk.speakers))
    console.info('Send email to speaker after submission')
    await email.send(mailgun, {
      to: speakers.map(user => user.email),
      subject: `[${event.name}] Talk submitted`,
      html: talkSubmitted(event, talk, app),
      confName: event.name,
    })

    // Send email to organizers after submission
    const { cc, bcc } = await getEmailRecipients(event, settings, 'submitted')
    if (cc || bcc) {
      console.info('Send email to organizers after submission')
      await email.send(mailgun, {
        to: [`no-reply@${mailgun.domain}`],
        cc,
        bcc,
        subject: `[${event.name}] Talk received`,
        html: talkReceived(event, talk, app),
        confName: event.name,
      })
    }

    // Send slack message to organizers
    sendSlackMessage(event, talk, speakers, settings, app, 'submitted')
  })
