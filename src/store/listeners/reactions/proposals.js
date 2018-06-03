import { reaction } from 'k-ramel'

import { flow, isEqual, omit, over, pickBy } from 'lodash/fp'
import * as firebase from 'firebase/proposals'

export const updateProposal = reaction(async (action, store, { router }) => {
  // get needed inputs
  const eventId = router.getRouteParam('eventId')
  const { proposal, options } = action.payload
  // update proposal
  await firebase.updateProposal(eventId, proposal, options)
  // update proposal in the store
  store.data.proposals.update(proposal)
})


export const loadEventProposals = reaction(async (action, store, { router }) => {
  store.data.proposals.reset()
  // get needed inputs
  const eventId = router.getRouteParam('eventId')
  const { uid } = store.auth.get()
  // get proposal filters
  const filters = store.ui.organizer.proposals.get()
  // fetch proposals
  const proposals = await firebase.fetchEventProposals(eventId, uid, filters)
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
    const ref = await firebase.fetchProposal(eventId, proposalId)
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
    const filters = store.ui.organizer.proposals.get()
    router.push({
      pathname: `/organizer/event/${eventId}/proposal/${proposalId}`,
      query: filters,
    })
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
    const filters = store.ui.organizer.proposals.get()
    router.push({
      pathname: `/organizer/event/${eventId}/proposal/${proposalId}`,
      query: filters,
    })
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
    const filters = store.ui.organizer.proposals.get()
    router.push({
      pathname: `/organizer/event/${eventId}/proposal/${proposalId}`,
      query: filters,
    })
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
