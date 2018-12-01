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
    const previousTalk = snap.before.data()
    const talk = snap.after.data()

    const { eventId } = context.params
    const submissionUpdate = {
      submissions: {
        [eventId]: { ...talk },
      },
    }
    console.log(`:::update::talk ${JSON.stringify(talk)}`)
    console.log(`:::update::submissionUpdate ${JSON.stringify(submissionUpdate)}`)
    if (talk.state === 'confirmed') {
      // Update talk to refresh status for speaker page.
      console.log(`:::update::confirmed ${JSON.stringify(submissionUpdate)}`)
      return partialUpdateTalk(talk.id, submissionUpdate)
    }

    // if proposal state didn't changed or email already sent, dont need to go further
    if (previousTalk.state === talk.state || talk.emailSent) {
      return null
    }

    const event = await getEvent(eventId)
    // if deliberation email disabled, dont need to go further
    if (!event.sendDeliberationEmails) {
      return null
    }

    // check mailgun configuration
    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    const uids = Object.keys(talk.speakers)
    // send email to accepted proposal
    if (talk.state === 'accepted' && !talk.emailSent) {
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
