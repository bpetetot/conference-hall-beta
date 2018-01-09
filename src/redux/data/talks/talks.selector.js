import { getRouterParam } from 'redux/router'
import talksData from './talks'

/**
 * Return the talk id from the router params
 * @param {object} state the redux state
 */
export const getTalkIdFromRouterParam = state => getRouterParam('talkId')(state)

/**
 * Return the talk with the id in the router params
 * @param {object} state the redux state
 */
export const getTalkFromRouterParam = (state) => {
  const id = getTalkIdFromRouterParam(state)
  return talksData.get(id)(state)
}

/**
 * Returns true if the talk has been submitted to the event
 * @param {string} talkId talk id
 * @param {string} eventId event id
 */
export const isSubmitted = (talkId, eventId) => (state) => {
  const talk = talksData.get(talkId)(state)
  if (talk && talk.submissions) {
    return !!talk.submissions[eventId]
  }
  return false
}
