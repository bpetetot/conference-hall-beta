import firebase from 'firebase/app'

import { downloadFile } from 'helpers/dom'
import * as firebaseProposals from 'firebase/proposals'

export const updateProposal = async (action, store, { router }) => {
  // get needed inputs
  const eventId = router.getParam('eventId')
  const { proposal, options } = action.payload
  // update proposal
  await firebaseProposals.updateProposal(eventId, proposal, options)
  // update proposal in the store
  store.data.proposals.update(proposal)
}

export const getProposal = async (action, store, { router }) => {
  // get event & proposal id from router
  const eventId = router.getParam('eventId')
  const proposalId = router.getParam('proposalId')
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
  const eventId = router.getParam('eventId')
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const nextIndex = proposalIndex + 1
  if (nextIndex < proposalKeys.length) {
    const proposalId = proposalKeys[nextIndex]
    store.ui.organizer.proposal.set({ proposalIndex: nextIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    const filters = store.ui.organizer.proposals.get()
    router.push('organizer-event-proposal-page', { eventId, proposalId }, filters)
  }
}

export const previousProposal = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  const { proposalIndex } = store.ui.organizer.proposal.get()
  const proposalKeys = store.data.proposals.getKeys()
  const prevIndex = proposalIndex - 1
  if (prevIndex >= 0) {
    const proposalId = proposalKeys[prevIndex]
    store.ui.organizer.proposal.set({ proposalIndex: prevIndex })
    store.dispatch({ type: '@@ui/ON_LOAD_RATINGS', payload: { eventId, proposalId } })
    const filters = store.ui.organizer.proposals.get()
    router.push('organizer-event-proposal-page', { eventId, proposalId }, filters)
  }
}

export const exportProposals = async (action, store, { router }) => {
  const eventId = router.getParam('eventId')
  store.ui.organizer.proposalsExport.update({ isExporting: true })

  const token = await firebase.auth().currentUser.getIdToken()

  // get proposal filters & sort from query params
  const queryParams = router.getQueryParams()
  const query = encodeURI(Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&'))

  // fetch proposal export
  try {
    const response = await fetch(
      `/api/private/export/${eventId}?${query}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    const blob = await response.blob()
    const filename = `export-${Date.now()}.json`
    downloadFile(filename, blob)

    store.ui.organizer.proposalsExport.update({ isExporting: false })
  } catch (error) {
    console.error(error) // eslint-disable-line
    store.ui.organizer.proposalsExport.update({ isExporting: false })
  }
}
