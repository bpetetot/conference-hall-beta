// eslint-disable-next-line import/prefer-default-export
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
  if (router.getParam('isEventPage')) {
    // set route eventId as app event context
    const eventId = router.getPathParam('eventId')
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
    }
  }
}
