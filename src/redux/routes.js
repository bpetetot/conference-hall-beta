import { routerForBrowser } from 'redux-little-router'

// application routes
const routes = {
  '/organizer': {
    title: 'HOME_ORGANIZER',
    '/menu': { title: 'MOBILE_MENU' },
    '/event/create': { title: 'CREATE_EVENT' },
    '/event': {
      title: 'HOME_EVENT',
      '/:id': {
        title: 'CONSULT_EVENT',
        '/edit': {
          title: 'EDIT_EVENT',
          '/cfp': { title: 'EDIT_EVENT_CFP' },
          '/members': { title: 'EDIT_EVENT_MEMBERS' },
        },
      },
    },
  },
  '/speaker': {
    title: 'HOME_SPEAKER',
    '/menu': { title: 'MOBILE_MENU' },
    '/profile': { title: 'SPEAKER_PROFILE' },
    '/talk/create': { title: 'CREATE_TALK' },
  },
  '/login': { title: 'LOGIN' },
  '/': { title: 'HOME' },
}

// selectors
export const getRouter = state => state.router
export const getRouterResult = state => getRouter(state).result

// check if given title match with the current route hierarchy
export const matchRecursively = (result, title) => {
  if (!result) return false
  if (result.title === title) return true
  return matchRecursively(result.parent, title)
}

// route matching
export const isRouteNotFound = state => !getRouterResult(state)
export const isOrganizerRoute = state => matchRecursively(getRouterResult(state), 'HOME_ORGANIZER')
export const isSpeakerRoute = state => matchRecursively(getRouterResult(state), 'HOME_SPEAKER')
export const isMobileMenuRoute = state => matchRecursively(getRouterResult(state), 'MOBILE_MENU')

// redux-little-router configuration
export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
