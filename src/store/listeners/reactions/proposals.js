import { reaction } from 'k-ramel'

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
