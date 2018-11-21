/* eslint-disable no-console */
const functions = require('firebase-functions')
const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const sendEmail = require('../email')
const talkConfirmed = require('../email/templates/talkConfirmed')

module.exports = functions.firestore
  .document('events/{eventId}/proposals/{proposalId}')
  .onCreate((snap, context) => {
    const talk = snap.data()
    console.log(`:::create::talk' ${JSON.stringify(talk)}`)
    const { eventId } = context.params
    const uids = Object.keys(talk.speakers)

    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    return Promise.all([getEvent(eventId), getUsers(uids)])
      .then(([event, users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk submitted`,
        html: talkConfirmed(event, talk, app.url),
      }))
  })
