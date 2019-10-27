import pick from 'lodash/pick'
import has from 'lodash/has'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

/**
 * Check if the talk can be deleted
 * @param {String} talkId talk id
 */
export const canBeDeleted = (talkId) => (store) => {
  const talk = store.data.talks.get(talkId)
  return !!talk && isEmpty(talk.submissions)
}

/**
 * Returns true if the talk has been submitted to the event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isSubmitted = (talkId, eventId) => (store) => {
  const talk = store.data.talks.get(talkId)
  if (talk && talk.submissions) {
    return !!talk.submissions[eventId]
  }
  return false
}

const isEqualToStatus = (status) => (talkId, eventId) => (store) => {
  const talk = store.data.talks.get(talkId)
  if (has(talk, `submissions[${eventId}].state`)) {
    return talk.submissions[eventId].state === status
  }
  return false
}

/**
 * Returns true if the talk has been accepted to the event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isAccepted = isEqualToStatus('accepted')

/**
 * Returns true if the talk has been rejected to the event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isRejected = isEqualToStatus('rejected')

/**
 * Returns true if the talk has been confirmed by the user for this event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isConfirmed = isEqualToStatus('confirmed')

/**
 * Returns true if the talk has been declined by the user for this event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isDeclined = isEqualToStatus('declined')


/**
 * Returns true if the talk informations are different from the submitted talk info in event
 * @param {String} talkId talk id
 * @param {String} eventId event id
 */
export const isOutOfDateForEvent = (talkId, eventId) => (store) => {
  if (isSubmitted(talkId, eventId)(store)) {
    const talk = store.data.talks.get(talkId)
    const comparedFields = ['title', 'abstract', 'level', 'references', 'speakers']
    const currentTalk = pick(talk, comparedFields)
    const submittedTalk = pick(talk.submissions[eventId], comparedFields)
    return !isEqual(currentTalk, submittedTalk)
  }
  return false
}
