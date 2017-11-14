import { routerForBrowser } from 'redux-little-router'

const routes = {
  '/organizer': {
    title: 'HOME_ORGANIZER',
    '/menu': { title: 'MOBILE_MENU' },
    '/event/create': { title: 'CREATE_EVENT' },
    '/event': {
      title: 'HOME_EVENT',
      '/:id': {
        title: 'CONSULT_EVENT',
        '/edit': { title: 'EDIT_EVENT' },
      },
    },
  },
  '/login': { title: 'LOGIN' },
  '/': { title: 'HOME' },
}

export const { reducer, middleware, enhancer } = routerForBrowser({ routes })
