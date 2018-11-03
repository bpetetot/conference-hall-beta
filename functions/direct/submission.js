const functions = require('firebase-functions')

const { DateTime } = require('luxon')

const isEmpty = require('lodash/isEmpty')
const omit = require('lodash/omit')

const { getEvent } = require('../firestore/event')
const { getTalk, updateTalk } = require('../firestore/talk')
const { addProposal } = require('../firestore/proposal')

const isSubmitted = (talk, eventId) => {
  if (talk && talk.submissions) {
    return !!talk.submissions[eventId]
  }
  return false
}

const getCfpState = functions.https.onCall(async ({ eventId, userTimezone = 'utc' }) => {
  const event = await getEvent(eventId)

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
})

const submitTalk = functions.https.onCall(async ({ eventId, talkId, userTimezone }) => {
  const talk = await getTalk(talkId)

  if (isSubmitted(talk, eventId)) {
    throw new Error('talk already submitted')
  } if (getCfpState({ eventId, userTimezone }) !== 'opened') {
    throw new Error('CFP is not opened')
  } else {
    const submittedTalk = { id: talkId, ...omit(talk, ['createTimestamp', 'submissions']) }

    await updateTalk(talkId, { [`submissions.${eventId}`]: submittedTalk })

    await addProposal(eventId, submittedTalk)
  }
})

module.exports = {
  getCfpState,
  submitTalk,
}
