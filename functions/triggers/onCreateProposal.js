/* eslint-disable no-console */
const functions = require('firebase-functions')

const { getEvent, getEventOrganizers } = require('../firestore/event')
const { getUsers } = require('../firestore/user')

const email = require('../email')
const talkSubmitted = require('../email/templates/talkSubmitted')
const talkReceived = require('../email/templates/talkReceived')

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
    if (!app) {
      throw new Error('You must provide the app.url variable')
    }
    const event = await getEvent(eventId)

    // Send email to speaker after submission
    const users = await getUsers(Object.keys(talk.speakers))
    await email.send(mailgun, {
      to: users.map(user => user.email),
      contact: null,
      subject: `[${event.name}] Talk submitted`,
      html: talkSubmitted(event, talk, app.url),
      confName: event.name,
    })

    // Send email to organizers after submission
    if (event.type === 'meetup') {
      const organizers = await getEventOrganizers(event)
      await email.send(mailgun, {
        to: organizers.map(user => user.email),
        contact: null,
        subject: `[${event.name}] New talk submitted`,
        html: talkReceived(event, talk, app.url),
        confName: event.name,
      })
    }
  })
