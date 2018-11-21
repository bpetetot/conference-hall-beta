/* eslint-disable no-console */
const functions = require('firebase-functions')
const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const { updateProposal } = require('../firestore/proposal')
const { partialUpdateTalk } = require('../firestore/talk')
const sendEmail = require('../email')
const talkAccepted = require('../email/templates/talkAccepted')
const talkRejected = require('../email/templates/talkRejected')


module.exports = functions.firestore
  .document('events/{eventId}/proposals/{proposalId}')
  .onUpdate(async (snap, context) => {
    const talk = snap.after.data()
    console.log(`:::update::talk ${JSON.stringify(talk)}`)

    const { eventId } = context.params
    const event = await getEvent(eventId)

    if (!event.sendDeliberationEmails) {
      return null
    }

    const uids = Object.keys(talk.speakers)
    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))
    const submissionUpdate = {
      submissions: {
        [eventId]: { ...talk },
      },
    }

    if (talk.state === 'accepted' && !talk.emailSent) {
      // set emailSent to make sure we send accepted email only once.
      talk.emailSent = talk.updateTimestamp
      console.log(`:::update::accepted ${JSON.stringify(submissionUpdate)}`)
      return Promise.all([
        getUsers(uids),
        updateProposal(eventId, talk),
        partialUpdateTalk(talk.id, submissionUpdate),
      ]).then(([users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk accepted!`,
        html: talkAccepted(event, users, talk, app.url),
      }))
    }

    if (talk.state === 'rejected' && !talk.emailSent) {
      // set emailSent to make sure we send declined email only once.
      talk.emailSent = talk.updateTimestamp
      console.log(`:::update::rejected ${JSON.stringify(submissionUpdate)}`)
      return Promise.all([
        getUsers(uids),
        updateProposal(eventId, talk),
        partialUpdateTalk(talk.id, submissionUpdate),
      ]).then(([users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk declined`,
        html: talkRejected(event, users, talk),
      }))
    }
    return null
  })
