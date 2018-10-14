const functions = require('firebase-functions')
const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const { updateProposal } = require('../firestore/proposal')
const sendEmail = require('../email')
const talkAccepted = require('../email/templates/talkAccepted')
const talkRejected = require('../email/templates/talkRejected')

module.exports = functions.firestore
  .document('events/{eventId}/proposals/{proposalId}')
  .onUpdate((snap, context) => {
    const talk = snap.after.data()
    console.log(`:::update::talk ${JSON.stringify(talk)}`)

    const { eventId } = context.params
    const uids = Object.keys(talk.speakers)
    const accepted = talk.state === 'accepted'
    const rejected = talk.state === 'rejected'
    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    if (accepted && talk.emailSent === undefined) {
      console.log(`:::update::accepted & set emailSent to talk ${talk.title}`)
      // set emailSent to make sure we send accepted email only once.
      talk.emailSent = talk.updateTimestamp
      return Promise.all([
        getEvent(eventId),
        getUsers(uids),
        updateProposal(eventId, talk)]).then(([event, users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk accepted!`,
        html: talkAccepted(event, users, talk, app.url),
      }))
    }

    if (rejected && talk.emailSent === undefined) {
      console.log(`:::update::rejected & set emailSent to talk ${talk.title}`)
      // set emailSent to make sure we send declined email only once.
      talk.emailSent = talk.updateTimestamp
      return Promise.all([
        getEvent(eventId),
        getUsers(uids),
        updateProposal(eventId, talk)]).then(([event, users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk declined`,
        html: talkRejected(event, users, talk, app.url),
      }))
    }
    return null
  })
