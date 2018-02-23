import { reaction } from 'k-ramel'
import { initializeCurrentLocation } from 'redux-little-router'

import { isRoute, isSpeakerRoute, getRouterParam } from 'store/reducers/router'

export const init = reaction((action, store) => {
  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }
})

export const onRouteChanged = reaction((action, store) => {
  const state = store.getState()

  // when speaker route get last eventId in localstorage
  if (isSpeakerRoute(state) && !store.ui.app.get().currentEventId) {
    const eventId = localStorage.getItem('currentEventId')
    if (eventId) {
      store.ui.app.update({ currentEventId: eventId })
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    }
  }

  // when Event route, set route eventId as app event context
  if (isRoute('HOME_EVENT')(state)) {
    const eventId = getRouterParam('eventId')(state)
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
    }
  }

  // when Invite speaker route, load invite talk and user
  if (isRoute('INVITE_SPEAKER')(state)) {
    const talkId = getRouterParam('talkId')(state)
    const uid = getRouterParam('uid')(state)
    store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: talkId })
    store.dispatch({ type: '@@ui/FETCH_USER', payload: uid })
  }
})
