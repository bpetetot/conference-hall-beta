import pick from 'lodash/pick'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'

/**
 * Check if the talk can be deleted
 * @param {String} talkId talk id
 */
export const canBeDeleted = talkId => (store) => {
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
