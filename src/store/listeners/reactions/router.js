import { reaction } from 'k-ramel'
import { initializeCurrentLocation, replace } from 'redux-little-router'
import { isEqual, pick, pickBy, update } from 'lodash/fp'

import {
  isRoute,
  isSpeakerRoute,
  getRouterParam,
  getRouterResult,
  getRouterQuery,
} from 'store/reducers/router'

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

  // when Proposal route, restore sortOrder from route query
  // (or the other way around as a fallback)
  if (isRoute('PROPOSALS')(state)) {
    const query = getRouterQuery(store.getState())

    const pickTruthyValues = pickBy(Boolean)
    const pickFilterKeys = pick(['categories', 'formats', 'sortOrder'])
    const ensureIncludedIn = values => value => (values.includes(value) ? value : values[0])

    const filtersFromRouterState = pickFilterKeys(query)
    const filtersFromUiState = pickTruthyValues(pickFilterKeys(store.ui.organizer.proposals.get()))
    const filtersFromBothStates = Object.assign({}, filtersFromUiState, filtersFromRouterState)
    const availableSortOrders = getRouterResult(store.getState()).sortOrders
    const validFilters = update('sortOrder', ensureIncludedIn(availableSortOrders), filtersFromBothStates)
    if (!isEqual(validFilters, filtersFromRouterState)) {
      store.dispatch(replace({ query: { ...query, ...validFilters } }))
    }
    if (!isEqual(validFilters, filtersFromUiState)) {
      store.ui.organizer.proposals.update(validFilters)
    }
  }
})
