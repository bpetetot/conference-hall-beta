/* eslint-disable no-console */
const functions = require('firebase-functions')
const { union } = require('lodash')

const { getEvent } = require('../firestore/event')
const { getUsers } = require('../firestore/user')
const { getOrganization } = require('../firestore/organization')

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
    const uids = Object.keys(talk.speakers)
    const users = await getUsers(uids)

    sendEmail(mailgun, {
      to: users.map(user => user.email),
      subject: `[${event.name}] Talk submitted`,
      html: talkConfirmed(event, talk, app.url),
    })

    // Send email to organizers after submission
    const { owner, organization } = event
    let organizerUids = [owner]
    if (organization) {
      const { members } = await getOrganization(organization)
      organizerUids = union(Object.keys(members), organizerUids)
    }
    const organizers = await getUsers(organizerUids)

    sendEmail(mailgun, {
      to: organizers.map(user => user.email),
      subject: `[${event.name}] Talk submitted by someone`,
      html: talkConfirmed(event, talk, app.url),
    })
  })
