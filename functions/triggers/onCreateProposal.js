/* eslint-disable no-console */
const functions = require('firebase-functions')

const { getEvent, getEventOrganizers } = require('../firestore/event')
const { getUsers } = require('../firestore/user')

const sendEmail = require('../email')
const talkConfirmed = require('../email/templates/talkConfirmed')

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

    await sendEmail(mailgun, {
      to: users.map(user => user.email),
      subject: `[${event.name}] Talk submitted`,
      html: talkConfirmed(event, talk, app.url),
    })

    // Send email to organizers after submission
    const organizers = await getEventOrganizers(event)

    await sendEmail(mailgun, {
      to: organizers.map(user => user.email),
      subject: `[${event.name}] Talk submitted by someone`,
      html: talkConfirmed(event, talk, app.url), // TODO change tempate here
    })
  })
