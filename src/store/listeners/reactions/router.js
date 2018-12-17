import isEmpty from 'lodash/isEmpty'

export const onRouteChanged = (action, store, { router }) => {
  // when speaker route get last eventId in localstorage
  const isSpeakerRoute = router.getParam('root') === 'speaker'
  if (isSpeakerRoute && !store.ui.app.get().currentEventId) {
    const eventId = localStorage.getItem('currentEventId')
    if (eventId) {
      store.ui.app.update({ currentEventId: eventId })
    }
  }

  // when Event route, set route eventId as app event context
  const isEventPage = router.getParam('isEventPage')
  if (isEventPage) {
    // set route eventId as app event context
    const eventId = router.getParam('eventId')
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
    }
  }
}

// redirect to a route with next url in query params
export const replaceWithNextUrl = (action, store, { router }) => {
  const route = action.payload
  const nextParams = { redirect: router.getCurrentCode() }

  if (!isEmpty(router.getPathParams())) {
    nextParams.params = JSON.stringify(router.getPathParams())
  }
  if (!isEmpty(router.getQueryParams())) {
    nextParams.query = JSON.stringify(router.getQueryParams())
  }

  return router.replace(route, null, nextParams)
}

// go to the redirect url if exists
export const redirectToNextUrl = (action, store, { router }) => {
  if (!router.isFound()) return

  const redirect = router.getParam('redirect')
  if (redirect) {
    const params = router.getParam('params') ? JSON.parse(router.getParam('params')) : undefined
    const query = router.getParam('query') ? JSON.parse(router.getParam('query')) : undefined
    router.replace(redirect, params, query)
  }
}
