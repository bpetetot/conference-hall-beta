import { routerForBrowser } from 'redux-little-router'

// application routes
const routes = {
  '/': {
    app: 'conference',
    appTitle: 'Conference Hall',
    title: 'HOME',
    '/login': { title: 'LOGIN' },
    '/public': {
      title: 'PUBLIC',
      '/event/:eventId': { title: 'PUBLIC_EVENT' },
    },
  },
  '/organizer': {
    app: 'organizer',
    appTitle: 'Organizer Hall',
    title: 'HOME_ORGANIZER',
    '/menu': { title: 'MOBILE_MENU' },
    '/event/create': { title: 'CREATE_EVENT' },
    '/event': {
      title: 'HOME_EVENT',
      '/:eventId': {
        title: 'EVENT_PAGE',
        '/edit': {
          title: 'EDIT_EVENT',
          '/cfp': { title: 'EDIT_EVENT_CFP' },
          '/members': { title: 'EDIT_EVENT_MEMBERS' },
        },
      },
    },
  },
  '/speaker': {
    app: 'speaker',
    appTitle: 'Speaker Hall',
    title: 'HOME_SPEAKER',
    '/menu': { title: 'MOBILE_MENU' },
    '/profile': { title: 'SPEAKER_PROFILE' },
    '/talk/create': { title: 'CREATE_TALK' },
    '/talk': {
      title: 'HOME_TALK',
      '/:talkId': {
        title: 'TALK_PAGE',
        '/edit': { title: 'EDIT_TALK' },
      },
    },
  },
}

// selectors
export const getRouter = state => state.router
export const getRouterResult = state => getRouter(state).result
export const getRouterParams = state => getRouter(state).params
export const getRouterParam = key => state => getRouterParams(state)[key]

// get the given attribute value for the current route hierarchy
const getRecursively = (result, attribute) => {
  if (!result) return undefined
  if (result[attribute]) return result[attribute]
  return getRecursively(result.parent, attribute)
}

// check if given title match with the current route hierarchy
const matchRoute = (result, title) => {
  if (!result) return false
  if (result.title === title) return true
  return matchRoute(result.parent, title)
}

// route matching
export const isRouteNotFound = state => !getRouterResult(state)
export const isPublicRoute = state => matchRoute(getRouterResult(state), 'PUBLIC')
export const isOrganizerRoute = state => matchRoute(getRouterResult(state), 'HOME_ORGANIZER')
export const isSpeakerRoute = state => matchRoute(getRouterResult(state), 'HOME_SPEAKER')
export const isMobileMenuRoute = state => matchRoute(getRouterResult(state), 'MOBILE_MENU')

// router attributes selectors
export const getAppName = state => getRecursively(getRouterResult(state), 'app')
export const getAppTitle = state => getRecursively(getRouterResult(state), 'appTitle')
export const getBaseRoute = (state) => {
  const app = getRecursively(getRouterResult(state), 'app')
  switch (app) {
    case 'speaker':
      return '/speaker'
    case 'organizer':
      return '/organizer'
    default:
      return '/'
  }
}

// redux-little-router configuration
export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
