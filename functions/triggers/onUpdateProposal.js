const functions = require('firebase-functions')
const pick = require('lodash/pick')
const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const { updateProposal } = require('../firestore/proposal')
const { partialUpdateTalk } = require('../firestore/talk')
const email = require('../email')
const talkAccepted = require('../email/templates/talkAccepted')
const talkRejected = require('../email/templates/talkRejected')

// onUpdateProposal is called when a submission is updated.
// If this update include a change is the proposal's state, it means deliberations happened and the
// talk is either accepted or rejected. In both cases, send an email to the speaker.
// To test this function online:
// > firebase functions:config:get > .runtimeconfig.json
// > firebase functions:shell
// > onUpdateProposal({before: {...}, after: {...}},  {params:{eventId: "...", proposalId: '...'}})
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
      ]).then(([users]) => email.send(mailgun, {
        to: users.map(user => user.email),
        contact: event.contact,
        subject: `[${event.name}] Talk accepted!`,
        html: talkAccepted(event, users, proposal, app.url),
        confName: event.name,
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
      ]).then(([users]) => email.send(mailgun, {
        to: users.map(user => user.email),
        contact: event.contact,
        subject: `[${event.name}] Talk declined`,
        html: talkRejected(event, users, proposal, app.url),
        confName: event.name,
      }))
    }

    return null
  })
