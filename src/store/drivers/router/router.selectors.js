import { selectors } from '@k-redux-router/core'

const getRouter = () => selectors(state => state.ui.router)

// selectors
export const getRouterResult = state => getRouter().getResult(state)

// router attributes selectors
export const getAppTitle = (state) => {
  const currentRoute = getRouter().getCurrentRoute(state) || {}
  return currentRoute.appTitle
}
export const getBaseRoute = (state) => {
  const currentRoute = getRouter().getCurrentRoute(state) || {}
  return currentRoute.base
}

// route matching
export const isPublicRoute = state => getBaseRoute(state) === 'public'
export const isOrganizerRoute = state => getBaseRoute(state) === 'organizer'
export const isSpeakerRoute = state => getBaseRoute(state) === 'speaker'
export const isEventPage = state => getBaseRoute(state) === 'HOME_EVENT'
