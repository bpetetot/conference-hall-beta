import { inject } from '@k-ramel/react'
import get from 'lodash/get'

import ProposalsList from './proposalsList'

const mapStore = (store, { eventId, userId }) => {
  const settings = store.data.eventsSettings.get(eventId)
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
    deliberationActive: get(settings, 'deliberation.enabled'),
    blindRating: get(settings, 'deliberation.blindRating'),
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
