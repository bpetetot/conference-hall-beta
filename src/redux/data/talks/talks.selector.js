import { getRouterParam } from 'redux/routes'
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
