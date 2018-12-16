/* eslint-disable import/prefer-default-export */

export const init = (action, store) => {
  // get eventId from app event context
  const currentEventId = localStorage.getItem('currentEventId')
  if (currentEventId) {
    store.ui.app.update({ currentEventId })
    store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: currentEventId })
  }
}
