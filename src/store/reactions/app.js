/* eslint-disable import/prefer-default-export */

export const init = (action, store, { router }) => {
  const isOrganizer = router.getParam('root') === 'organizer'

  // get eventId from app event context
  const currentEventId = localStorage.getItem('currentEventId')
  if (!isOrganizer && currentEventId) {
    store.ui.app.update({ currentEventId })
    store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: currentEventId })
  }
}
