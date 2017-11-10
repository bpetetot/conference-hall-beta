import { routerForBrowser } from 'redux-little-router'

const routes = {
  '/organizer': {
    '/event': {
      '/:id': {},
      '/create': {},
    },
  },
  '/login': {},
  '/': {},
}

export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
