const functions = require('firebase-functions')

const { DateTime } = require('luxon')

const { get, isEmpty, omit } = require('lodash')
const { flow, unset } = require('immutadot')

const { getUser } = require('../firestore/user')
const { getEvent } = require('../firestore/event')
const { updateTalk } = require('../firestore/talk')
const {
  addProposal,
  updateProposal,
  removeProposal,
  getEventUserProposals,
} = require('../firestore/proposal')

const isSubmitted = (talk, eventId) => {
  if (talk && talk.submissions) {
    return !!talk.submissions[eventId]
  }
  return false
}

const getCfpState = ({ event, userTimezone = 'utc' }) => {
  if (event.type === 'meetup') {
    return event.cfpOpened ? 'opened' : 'closed'
  }

  const { address, cfpDates } = event
  if (isEmpty(cfpDates)) {
    return 'not-started'
  }

  // By default 'Europe/Paris' because now it should be mandatory
  const eventTimezone = get(address, 'timezone.id', 'Europe/Paris')

  const start = DateTime.fromJSDate(cfpDates.start.toDate()).setZone(eventTimezone)
  const end = DateTime.fromJSDate(cfpDates.end.toDate()).setZone(eventTimezone).plus({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })
  const today = DateTime.utc().setZone(userTimezone)

  console.log({
    start: start.toString(),
    end: end.toString(),
    today: today.toString(),
  })

  if (today < start) {
    return 'not-started'
  }
  if (today > end) {
    return 'closed'
  }
  return 'opened'
}

const submitTalk = async ({
  eventId, talk, userTimezone, initialize,
}, context) => {
  if (initialize) {
    // get the user to fully preload the function
    await getUser(context.auth.uid)
    return
  }

  const event = await getEvent(eventId)

  const isCfpOpened = getCfpState({ event, userTimezone }) === 'opened'
  if (!isCfpOpened) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      "Can't submit, CFP is not opened anymore.",
    )
  }
  // check limit of proposals when creating a new submission
  const proposals = await getEventUserProposals(eventId, context.auth.uid)
  if (event.maxProposals && proposals.length >= event.maxProposals && !isSubmitted(talk, eventId)) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      `Max number of submitted talks. ${event.name} limits at ${event.maxProposals} submissions per user. Please consider unsubmitting for a wise selection`,
    )
  }
  const submittedTalk = omit(talk, ['createTimestamp', 'updateTimestamp', 'submissions'])

  await updateTalk(submittedTalk.id, { [`submissions.${eventId}`]: submittedTalk })

  if (isSubmitted(talk, eventId)) {
    await updateProposal(eventId, submittedTalk)
  } else {
    await addProposal(eventId, submittedTalk)
  }
}

const unsubmitTalk = async ({
  eventId, talk, userTimezone, initialize,
}, context) => {
  if (initialize) {
    // get the user to fully preload the function
    await getUser(context.auth.uid)
    return Promise.resolve()
  }

  const event = await getEvent(eventId)

  const isCfpOpened = getCfpState({ event, userTimezone }) === 'opened'
  if (!isCfpOpened) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      "Can't unsubmit, CFP is not opened anymore.",
    )
  }

  const updatedTalk = flow(
    unset(`submissions.${eventId}`),
    unset('state'),
  )(talk)

  await updateTalk(updatedTalk.id, updatedTalk)

  await removeProposal(eventId, talk.id)

  return updatedTalk
}

module.exports = {
  submitTalk: functions.https.onCall(submitTalk),
  unsubmitTalk: functions.https.onCall(unsubmitTalk),
}
