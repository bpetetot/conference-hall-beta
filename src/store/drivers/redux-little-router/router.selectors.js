import { selectors } from '@k-redux-router/core'

const getRouter = () => selectors(state => state.ui.router)

// selectors
export const getRouterResult = state => getRouter().getResult(state)
export const getRouterParams = state => getRouter().getParams(state)
export const getRouterParam = key => state => getRouterParams(state)[key]
export const getRouterQuery = state => getRouter().getQueryParams(state)
export const getRouterQueryParam = key => state => getRouterQuery(state)[key]

// check if given title match with the current route hierarchy
const matchRoute = (result, title) => {
  if (!result) return false
  if (result.title === title) return true
  return matchRoute(result.parent, title)
}

// router attributes selectors
export const getAppName = state => getRouter().getCurrentRoute(state).app
export const getAppTitle = state => getRouter().getCurrentRoute(state).appTitle
export const getBaseRoute = state => getRouter().getCurrentRoute(state).base

// route matching
export const isRoute = title => state => matchRoute(getRouterResult(state), title)
export const isPublicRoute = state => getBaseRoute(state) === 'PUBLIC'
export const isOrganizerRoute = state => getBaseRoute(state) === 'HOME_ORGANIZER'
export const isSpeakerRoute = state => getBaseRoute(state) === 'HOME_SPEAKER'
