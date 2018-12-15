import { isRoute, isSpeakerRoute } from 'store/drivers/redux-little-router'

// eslint-disable-next-line import/prefer-default-export
export const onRouteChanged = (action, store, { router }) => {
  const state = store.getState()

  // when speaker route get last eventId in localstorage
  if (isSpeakerRoute(state) && !store.ui.app.get().currentEventId) {
    const eventId = localStorage.getItem('currentEventId')
    if (eventId) {
      store.ui.app.update({ currentEventId: eventId })
    }
  }

  // when Event route, set route eventId as app event context
  if (isRoute('HOME_EVENT')(state)) {
    // set route eventId as app event context
    const eventId = router.getPathParam('eventId')
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
    }
  }
}
