const functions = require('firebase-functions')

const { DateTime } = require('luxon')

const { isEmpty, omit } = require('lodash')
const { flow, unset } = require('immutadot')

const { getEvent } = require('../firestore/event')
const { updateTalk } = require('../firestore/talk')
const { addProposal, updateProposal, removeProposal } = require('../firestore/proposal')

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

  const { cfpDates } = event
  if (isEmpty(cfpDates)) {
    return 'not-started'
  }

  const start = DateTime.fromJSDate(cfpDates.start.toDate()).startOf('day')
  const end = DateTime.fromJSDate(cfpDates.end.toDate()).endOf('day')
  const today = DateTime.local().setZone(userTimezone)

  if (today < start) {
    return 'not-started'
  }
  if (today > end) {
    return 'closed'
  }
  return 'opened'
}

const submitTalk = async ({ eventId, talk, userTimezone }) => {
  const event = await getEvent(eventId)

  const isCfpOpened = getCfpState({ event, userTimezone }) === 'opened'
  if (!isCfpOpened) {
    throw new functions.https.HttpsError('failed-precondition', 'Can\'t submit, CFP is not opened anymore.')
  }

  const submittedTalk = omit(talk, ['createTimestamp', 'submissions'])

  await updateTalk(submittedTalk.id, { [`submissions.${eventId}`]: submittedTalk })

  if (isSubmitted(talk, eventId)) {
    await updateProposal(eventId, submittedTalk)
  } else {
    await addProposal(eventId, submittedTalk)
  }
}

const unsubmitTalk = async ({ eventId, talk, userTimezone }) => {
  const event = await getEvent(eventId)

  const isCfpOpened = getCfpState({ event, userTimezone }) === 'opened'
  if (!isCfpOpened) {
    throw new functions.https.HttpsError('failed-precondition', 'Can\'t unsubmit, CFP is not opened anymore.')
  }

  const updatedTalk = flow(unset(`submissions.${eventId}`), unset('state'))(talk)

  await updateTalk(updatedTalk.id, updatedTalk)

  await removeProposal(eventId, talk.id)

  return updatedTalk
}

module.exports = {
  submitTalk: functions.https.onCall(submitTalk),
  unsubmitTalk: functions.https.onCall(unsubmitTalk),
}
