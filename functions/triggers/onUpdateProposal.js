/* eslint-disable no-console */
const functions = require('firebase-functions')
const pick = require('lodash/pick')

const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const { updateProposal } = require('../firestore/proposal')
const { partialUpdateTalk } = require('../firestore/talk')
const email = require('../email')
const talkAccepted = require('../email/templates/talkAccepted')
const talkRejected = require('../email/templates/talkRejected')
const { getEventEmails } = require('../helpers/eventEmails')

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
    // if proposal state didn't changed or email was delivered, don't need to go further
    if (previousProposal.state === proposal.state
      && previousProposal.emailStatus === proposal.emailStatus) {
      return null
    }

    // check mailgun configuration
    const { app, mailgun } = functions.config()
    const uids = Object.keys(proposal.speakers)

    // embedded submission in talk
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

    // send email to accepted or declined proposal
    if ((proposal.state === 'accepted' || proposal.state === 'rejected') && proposal.emailStatus === 'sending') {
      console.info(`[${proposal.id}] send email to accepted or rejected proposal`)

      const event = await getEvent(eventId)
      proposal.emailSent = proposal.updateTimestamp
      proposal.emailStatus = 'sent'

      const status = proposal.state === 'accepted' ? 'accepted' : 'declined'
      const { cc, bcc } = await getEventEmails(event, proposal.state)

      return Promise.all([
        getUsers(uids),
        updateProposal(eventId, proposal),
        partialUpdateTalk(proposal.id, submissionUpdate),
      ]).then(([users]) => email.send(mailgun, {
        to: users.map(user => user.email),
        cc,
        bcc,
        contact: event.contact,
        subject: `[${event.name}] Talk ${status}`,
        html: status === 'accepted' ? talkAccepted(event, users, proposal, app) : talkRejected(event, users, proposal, app),
        confName: event.name,
        webHookInfo: { type: 'deliberation_email', talkId: proposal.id, eventId },
      })).then(() => null) // avoid cloud function error. see: https://stackoverflow.com/questions/44790496/cloud-functions-for-firebase-error-serializing-return-value
    }

    if (previousProposal.state !== proposal.state) {
      console.info(`[${proposal.id}] update proposal state`)
      return updateProposal(eventId, proposal)
    }
    return null
  })
