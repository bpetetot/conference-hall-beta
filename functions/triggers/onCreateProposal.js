/* eslint-disable no-console */
const functions = require('firebase-functions')

const { getEvent, getEventOrganizers } = require('../firestore/event')
const { getUsers } = require('../firestore/user')

const email = require('../email')
const talkSubmitted = require('../email/templates/talkSubmitted')

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

    let cc
    let bcc
    if (event.emailorga) {
      const organizers = await getEventOrganizers(event)
      bcc = organizers.map(user => user.email)
    }
    if (event.emailcontact && event.contact) {
      cc = [event.contact]
    }

    // Send email to speaker after submission, bcc orga email, cc conference mailing list
    const users = await getUsers(Object.keys(talk.speakers))
    await email.send(mailgun, {
      to: users.map(user => user.email),
      cc,
      bcc,
      subject: `[${event.name}] Talk submitted`,
      html: talkSubmitted(event, talk, app.url),
      confName: event.name,
    })
  })
