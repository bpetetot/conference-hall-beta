import { reaction } from 'k-ramel'
import { initializeCurrentLocation } from 'redux-little-router'

import { isRoute, getRouterParam } from 'store/reducers/router'

export const init = reaction((action, store) => {
  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }
})

export const onRouteChanged = reaction((action, store) => {
  const state = store.getState()
  if (isRoute('HOME_EVENT')(state)) {
    // set route eventId as app event context
    const eventId = getRouterParam('eventId')(state)
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
    }
  }
})
