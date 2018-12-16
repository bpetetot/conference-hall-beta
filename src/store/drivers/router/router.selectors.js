import { selectors } from '@k-redux-router/core'

const getRouter = () => selectors(state => state.ui.router)

// selectors
export const getRouterResult = state => getRouter().getResult(state)

// router attributes selectors
export const getAppTitle = state => getRouter().getCurrentRoute(state).appTitle
export const getBaseRoute = state => getRouter().getCurrentRoute(state).base

// route matching
export const isPublicRoute = state => getBaseRoute(state) === 'public'
export const isOrganizerRoute = state => getBaseRoute(state) === 'HOME_ORGANIZER'
export const isSpeakerRoute = state => getBaseRoute(state) === 'HOME_SPEAKER'
export const isEventPage = state => getBaseRoute(state) === 'HOME_EVENT'
