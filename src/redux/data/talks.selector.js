/* eslint-disable import/prefer-default-export */

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
