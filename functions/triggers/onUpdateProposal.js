const functions = require('firebase-functions')
const pick = require('lodash/pick')
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
    const previousProposal = snap.before.data()
    const proposal = snap.after.data()

    // if proposal state didn't changed or email sent, dont need to go further
    if (previousProposal.state === proposal.state || proposal.emailSent) {
      return null
    }

    // check mailgun configuration
    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    const uids = Object.keys(proposal.speakers)

    const submissionUpdate = {
      submissions: {
        [eventId]: pick(proposal, [
          'id',
          'title',
          'abstract',
          'level',
          'state',
          'categories',
          'formats',
          'speakers',
          'references',
          'comments',
          'emailSent',
        ]),
      },
    }

    // send email to accepted proposal
    if (proposal.state === 'accepted' && !proposal.emailSent) {
      const event = await getEvent(eventId)
      proposal.emailSent = proposal.updateTimestamp

      return Promise.all([
        getUsers(uids),
        updateProposal(eventId, proposal),
        partialUpdateTalk(proposal.id, submissionUpdate),
      ]).then(([users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk accepted!`,
        html: talkAccepted(event, users, proposal, app.url),
      }))
    }

    // send email to rejected proposal
    if (proposal.state === 'rejected' && !proposal.emailSent) {
      const event = await getEvent(eventId)
      proposal.emailSent = proposal.updateTimestamp

      return Promise.all([
        getUsers(uids),
        updateProposal(eventId, proposal),
        partialUpdateTalk(proposal.id, submissionUpdate),
      ]).then(([users]) => sendEmail(mailgun, {
        to: users.map(user => user.email),
        subject: `[${event.name}] Talk declined`,
        html: talkRejected(event, users, proposal),
      }))
    }

    return null
  })
