import firebase from 'firebase/app'

import * as firebaseProposals from 'firebase/proposals'

export const updateProposal = async (action, store, { router }) => {
  // get needed inputs
  const eventId = router.getRouteParam('eventId')
  const { proposal, options } = action.payload
  // update proposal
  await firebaseProposals.updateProposal(eventId, proposal, options)
  // update proposal in the store
  store.data.proposals.update(proposal)
}

export const getProposal = async (action, store, { router }) => {
  // get event & proposal id from router
  const eventId = router.getRouteParam('eventId')
  const proposalId = router.getRouteParam('proposalId')
  // check if already in the store
  const inStore = store.data.proposals.get(proposalId)
  if (!inStore) {
    // fetch proposal from id
    const ref = await firebaseProposals.fetchProposal(eventId, proposalId)
    if (ref.exists) {
      store.data.proposals.add(ref.data())
    }
  }
  // get associated ratings
  store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
}

export const nextProposal = async (action, store, { router }) => {
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
}

export const previousProposal = async (action, store, { router }) => {
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
}

export const exportProposals = async (action, store, { router }) => {
  const eventId = router.getRouteParam('eventId')

  const token = await firebase.auth().currentUser.getIdToken()

  console.log(`Fetch export with token ${token} for event ${eventId}`)

  try {
    const response = await fetch(`https://conference-hall.firebaseapp.com/api/private/export/${eventId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const result = await response.text()
    console.log(result)
  } catch (error) {
    console.error('Error fetching export cloud function')
    console.error(error)
  }
}
