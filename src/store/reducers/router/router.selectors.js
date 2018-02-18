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
export const isRoute = title => state => matchRoute(getRouterResult(state), title)
export const isPublicRoute = state => isRoute('PUBLIC')(state)
export const isOrganizerRoute = state => isRoute('HOME_ORGANIZER')(state)
export const isSpeakerRoute = state => isRoute('HOME_SPEAKER')(state)
export const isMobileMenuRoute = state => isRoute('MOBILE_MENU')(state)

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
