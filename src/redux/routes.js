import { routerForBrowser } from 'redux-little-router'

const routes = {
  '/organizer': {},
  '/login': {},
  '/': {},
}

export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
