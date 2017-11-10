import { routerForBrowser } from 'redux-little-router'

const routes = {
  '/organizer': {
    '/event': {
      '/create': {},
    },
  },
  '/login': {},
  '/': {},
}

export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
