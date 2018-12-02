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
    const { eventId } = context.params
    const previousTalk = snap.before.data()
    const talk = snap.after.data()

    // if proposal state didn't changed or email sent, dont need to go further
    if (previousTalk.state === talk.state || talk.emailSent) {
      return null
    }

    // check mailgun configuration
    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    const uids = Object.keys(talk.speakers)

    const submissionUpdate = {
      submissions: {
        [eventId]: { ...talk },
      },
    }

    // send email to accepted proposal
    if (talk.state === 'accepted' && !talk.emailSent) {
      const event = await getEvent(eventId)
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

    // send email to rejected proposal
    if (talk.state === 'rejected' && !talk.emailSent) {
      const event = await getEvent(eventId)
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
