import firebase from 'firebase/app'

import { downloadFile } from 'helpers/dom'
import * as firebaseProposals from 'firebase/proposals'

export const updateProposal = async (action, store) => {
  // get needed inputs
  const { eventId, proposal, options } = action.payload
  // update proposal
  await firebaseProposals.updateProposal(eventId, proposal, options)
  // update proposal in the store
  store.data.proposals.update(proposal)
}

export const getProposal = async (action, store) => {
  // get event & proposal id from router
  const { eventId, proposalId } = action.payload
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

export const exportProposals = async (action, store, { router }) => {
  const { output } = action.payload
  const eventId = router.getParam('eventId')
  store.ui.organizer.proposalsExport.update({ exporting: output })

  const token = await firebase.auth().currentUser.getIdToken()

  // get proposal filters & sort from query params
  const queryParams = router.getQueryParams()
  const query = encodeURI(
    Object.entries({ ...queryParams, output })
      .map(([key, value]) => `${key}=${value}`)
      .join('&'),
  )

  // fetch proposal export
  try {
    const response = await fetch(`/api/private/export/${eventId}?${query}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    const blob = await response.blob()
    const filename = `export-${Date.now()}.${output}`
    downloadFile(filename, blob)

    store.ui.organizer.proposalsExport.update({ exporting: null })
  } catch (error) {
    console.error(error) // eslint-disable-line
    store.ui.organizer.proposalsExport.update({ exporting: null })
  }
}
