import { routerForBrowser } from 'redux-little-router'

const routes = {
  '/organizer': {
    '/event': {
      '/:id': {
        '/edit': {},
      },
      '/create': {},
    },
  },
  '/login': {},
  '/': {},
}

export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
