import { reaction } from 'k-ramel'
import { initializeCurrentLocation, replace } from 'redux-little-router'
import { isEqual, pick, pickBy, update } from 'lodash/fp'

import { isRoute, isSpeakerRoute } from 'store/drivers/redux-little-router'

export const init = reaction((action, store) => {
  const initialLocation = store.getState().router
  if (initialLocation) {
    store.dispatch(initializeCurrentLocation(initialLocation))
  }
})

export const onRouteChanged = reaction((action, store, { router }) => {
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
    // set route eventId as app event context
    const eventId = router.getRouteParam('eventId')
    if (eventId !== store.ui.app.get().currentEventId) {
      localStorage.setItem('currentEventId', eventId)
      store.ui.app.update({ currentEventId: eventId })
      store.dispatch({ type: '@@ui/ON_LOAD_EVENT', payload: eventId })
    }
  }

  // when Invite speaker route, load invite talk and user
  if (isRoute('INVITE_SPEAKER')(state)) {
    const talkId = router.getRouteParam('talkId')
    const uid = router.getRouteParam('uid')
    store.dispatch({ type: '@@ui/ON_LOAD_TALK', payload: talkId })
    store.dispatch({ type: '@@ui/FETCH_USER', payload: uid })
  }

  // when Proposal route, restore sortOrder from route query
  // (or the other way around as a fallback)
  if (isRoute('PROPOSALS')(state)) {
    const { query } = router.get()

    const pickTruthyValues = pickBy(Boolean)
    const pickFilterKeys = pick(['ratings', 'categories', 'formats', 'sortOrder'])
    const ensureIncludedIn = values => value => (values.includes(value) ? value : values[0])

    const filtersFromRouterState = pickFilterKeys(query)
    const filtersFromUiState = pickTruthyValues(pickFilterKeys(store.ui.organizer.proposals.get()))
    const filtersFromBothStates = { ...filtersFromUiState, ...filtersFromRouterState }

    const availableSortOrders = router.getParentResultParam('sortOrders')
    let validFilters = update('sortOrder', ensureIncludedIn(availableSortOrders), filtersFromBothStates)

    const availableRatings = router.getParentResultParam('ratings')
    validFilters = update('ratings', ensureIncludedIn(availableRatings), validFilters)

    if (!isEqual(validFilters, filtersFromRouterState)) {
      store.dispatch(replace({ query: { ...query, ...validFilters } }))
    }
    if (!isEqual(validFilters, filtersFromUiState)) {
      store.ui.organizer.proposals.update(validFilters)
    }
  }
})
