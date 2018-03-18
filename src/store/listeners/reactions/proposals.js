import { reaction } from 'k-ramel'

import { flow, isEqual, omit, over, pickBy } from 'lodash/fp'
import { fetchProposal, fetchEventProposals } from 'firebase/proposals'

export const loadEventProposals = reaction(async (action, store, { router }) => {
  store.data.proposals.reset()
  // get needed inputs
  const eventId = router.getRouteParam('eventId')
  const { uid } = store.auth.get()
  // get proposal filters
  const filters = store.ui.organizer.proposals.get()
  // fetch proposals
  const proposals = await fetchEventProposals(eventId, uid, filters)
  // set proposals in the store
  store.data.proposals.set(proposals)
})

export const getProposal = reaction(async (action, store, { router }) => {
  // get event & proposal id from router
  const eventId = router.getRouteParam('eventId')
  const proposalId = router.getRouteParam('proposalId')
  // check if already in the store
  const inStore = store.data.proposals.get(proposalId)
  if (!inStore) {
    // fetch proposal from id
    const ref = await fetchProposal(eventId, proposalId)
    if (ref.exists) {
      store.data.proposals.add(ref.data())
    }
  }
  // get associated ratings
  store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
})

export const selectProposal = reaction(async (action, store, { router }) => {
  const { eventId, proposalId } = action.payload
  const proposalKeys = store.data.proposals.getKeys()
  const proposalIndex = proposalKeys.indexOf(proposalId)
  if (proposalIndex !== -1) {
    store.ui.organizer.proposal.set({ proposalIndex })
    router.push(`/organizer/event/${eventId}/proposal/${proposalId}`)
  }
})

export const nextProposal = reaction(async (action, store, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const nextIndex = proposalIndex + 1
  if (nextIndex < proposalKeys.length) {
    const proposalId = proposalKeys[nextIndex]
    store.ui.organizer.proposal.set({ proposalIndex: nextIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    router.push(`/organizer/event/${eventId}/proposal/${proposalId}`)
  }
})

export const previousProposal = reaction(async (action, store, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const prevIndex = proposalIndex - 1
  if (prevIndex >= 0) {
    const proposalId = proposalKeys[prevIndex]
    store.ui.organizer.proposal.set({ proposalIndex: prevIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    router.push(`/organizer/event/${eventId}/proposal/${proposalId}`)
  }
})

export const saveSortOrderToRoute = reaction(async (action, store, { router }) => {
  const [removedFilters, addedOrModifiedFilters] = over([
    flow(pickBy(filter => !filter), Object.keys),
    pickBy(filter => filter),
  ])(action.payload)
  const { query } = router.get()
  const updatedQuery = flow(omit(removedFilters), filters => ({
    ...filters,
    ...addedOrModifiedFilters,
  }))(query)
  if (!isEqual(query, updatedQuery)) {
    router.replace({ query: updatedQuery })
  }
})
