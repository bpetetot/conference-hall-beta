const functions = require('firebase-functions')
const sendEmail = require('./email')
const talkConfirmed = require('./templates/talkConfirmed')
const admin = require('firebase-admin')

admin.initializeApp()

const getEvent = eventId =>
  admin
    .firestore()
    .collection('events')
    .doc(eventId)
    .get()
    .then(doc => doc.data())

const getUsersEmail = uids =>
  Promise.all(uids.map(uid =>
    new Promise((resolve) => {
      admin
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((doc) => {
          if (!doc.exists) return resolve()
          return resolve(doc.data().email)
        })
    })))

exports.onCreateProposal = functions.firestore
  .document('events/{eventId}/proposals/{proposalId}')
  .onCreate((snap, context) => {
    const talk = snap.data()
    const { eventId } = context.params
    const uids = Object.keys(talk.speakers)

    const { app, mailgun } = functions.config()
    if (!app) return Promise.reject(new Error('You must provide the app.url variable'))

    return Promise.all([getEvent(eventId), getUsersEmail(uids)])
      .then(([event, emails]) =>
        sendEmail(mailgun, {
          to: emails,
          subject: `[${event.name}] Talk submitted`,
          html: talkConfirmed(event, talk, app.url),
        }))
  })
