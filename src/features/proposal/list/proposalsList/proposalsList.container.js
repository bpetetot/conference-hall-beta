import { inject } from '@k-ramel/react'

import ProposalsList from './proposalsList'

const mapStore = (store, { eventId, userId }) => {
  const { page, itemsPerPage } = store.ui.organizer.proposalsPaging.get()
  const { items } = store.ui.organizer.proposalsSelection.get()
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage - 1
  const proposals = store.data.proposals
    .getAsArray()
    .filter((_, index) => index >= startIndex && index <= endIndex)

  return {
    proposals,
    proposalsSelection: items,
    onLoad: ({ filters }) => {
      store.dispatch({
        type: '@@ui/ON_LOAD_EVENT_PROPOSALS',
        payload: { userId, eventId, filters },
      })
    },
    onAddProposalToSelection: (proposalId) => {
      store.dispatch({ type: '@@ui/ON_ADD_PROPOSAL_TO_SELECTION', payload: { proposalId } })
    },
  }
}

export default inject(mapStore)(ProposalsList)
