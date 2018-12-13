import {
  flow, isEqual, omit, over, pick, update, pickBy,
} from 'lodash/fp'

import * as firebase from 'firebase/proposals'
import { fetchUser } from 'firebase/user'

/* set proposal filters from URL query params */
export const setProposalFiltersFromRouter = (action, store, { router }) => {
  const { query } = router.get()

  const pickTruthyValues = pickBy(Boolean)
  const pickFilterKeys = pick(['state', 'ratings', 'categories', 'formats', 'sortOrder', 'search'])
  const ensureIncludedIn = values => value => (values.includes(value) ? value : values[0])

  const filtersFromRouterState = pickFilterKeys(query)
  const filtersFromUiState = pickTruthyValues(pickFilterKeys(store.ui.organizer.proposals.get()))
  const filtersFromBothStates = { ...filtersFromUiState, ...filtersFromRouterState }

  const availableSortOrders = router.getParentResultParam('sortOrders')
  const validFilters = update(
    'sortOrder',
    ensureIncludedIn(availableSortOrders),
    filtersFromBothStates,
  )

  if (!isEqual(validFilters, filtersFromRouterState)) {
    router.replace({ query: { ...query, ...validFilters } })
  }
  if (!isEqual(validFilters, filtersFromUiState)) {
    store.ui.organizer.proposals.update(validFilters)
  }
}

/* load proposals */
export const loadProposals = async (action, store, { router }) => {
  store.data.proposals.reset()
  store.ui.organizer.proposalsPaging.update({ page: 1 })

  const eventId = router.getRouteParam('eventId')
  const { uid } = store.auth.get()

  const filters = store.ui.organizer.proposals.get()
  const proposals = await firebase.fetchEventProposals(eventId, uid, filters)
  const props = await Promise.all(proposals.map(async (proposal) => {
    const prop = { ...proposal }
    const speakerList = Object.keys(prop.speakers)
    const speakerNameList = await Promise.all(speakerList.map(async (sp) => {
      const user = await fetchUser(sp)
      return user.data().displayName
    }))
    prop.speakerName = speakerNameList.join(' - ')
    return prop
  }))
  store.data.proposals.set(props)
}

/* select a proposal */
export const selectProposal = async (action, store, { router }) => {
  const { eventId, proposalId } = action.payload
  const proposalKeys = store.data.proposals.getKeys()
  const proposalIndex = proposalKeys.indexOf(proposalId)

  if (proposalIndex !== -1) {
    store.ui.organizer.proposal.set({ proposalIndex })
    const filters = store.ui.organizer.proposals.get()
    router.push({
      pathname: `/organizer/event/${eventId}/proposal/${proposalId}`,
      query: filters,
    })
  }
}

/* when filters changes synchronize filters with url and load proposals */
export const changeFilter = async (action, store, { router }) => {
  const [removedFilters, addedOrModifiedFilters] = over([
    flow(
      pickBy(filter => !filter),
      Object.keys,
    ),
    pickBy(filter => filter),
  ])(action.payload)

  const { query } = router.get()
  const updatedQuery = flow(
    omit(removedFilters),
    filters => ({
      ...filters,
      ...addedOrModifiedFilters,
    }),
  )(query)

  if (!isEqual(query, updatedQuery)) {
    router.replace({ query: updatedQuery })
    store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS')
  }
}

/* load speakers */
export const loadSpeakers = async (action, store) => store.ui.organizer.speakersForEvent
