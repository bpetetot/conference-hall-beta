import { reaction } from 'k-ramel'
import { push } from 'redux-little-router'

import { getRouterParam } from 'store/reducers/router'
import { fetchProposal, fetchEventProposals } from 'firebase/proposals'

export const loadEventProposals = reaction(async (action, store) => {
  // get needed inputs
  const eventId = getRouterParam('eventId')(store.getState())
  const { uid } = store.auth.get()
  // get proposal filters
  const filters = store.ui.organizer.proposals.get()
  // fetch proposals
  const proposals = await fetchEventProposals(eventId, uid, filters)
  // set proposals in the store
  store.data.proposals.set(proposals)
})

export const getProposal = reaction(async (action, store) => {
  // get event id from router
  const eventId = getRouterParam('eventId')(store.getState())
  // get proposal id from router
  const proposalId = getRouterParam('proposalId')(store.getState())
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

export const selectProposal = reaction(async (action, store) => {
  const { eventId, proposalId } = action.payload
  const proposalKeys = store.data.proposals.getKeys()
  const proposalIndex = proposalKeys.indexOf(proposalId)
  if (proposalIndex !== -1) {
    store.ui.organizer.proposal.set({ proposalIndex })
    store.dispatch(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
})

export const nextProposal = reaction(async (action, store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const nextIndex = proposalIndex + 1
  if (nextIndex < proposalKeys.length) {
    const proposalId = proposalKeys[nextIndex]
    store.ui.organizer.proposal.set({ proposalIndex: nextIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    store.dispatch(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
})

export const previousProposal = reaction(async (action, store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const prevIndex = proposalIndex - 1
  if (prevIndex >= 0) {
    const proposalId = proposalKeys[prevIndex]
    store.ui.organizer.proposal.set({ proposalIndex: prevIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    store.dispatch(push(`/organizer/event/${eventId}/proposal/${proposalId}`))
  }
})
