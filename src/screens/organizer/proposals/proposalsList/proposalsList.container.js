import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import ProposalsList from './proposalsList'

const mapStore = (store, { eventId }) => {
  const { deliberationActive } = store.data.events.get(eventId) || {}
  const { page, itemsPerPage } = store.ui.organizer.proposalsPaging.get()
  const { items } = store.ui.organizer.proposalsSelection.get()
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage - 1
  const proposals = store.data.proposals
    .getAsArray()
    .filter((_, index) => index >= startIndex && index <= endIndex)

  return {
    loaded: store.data.proposals.isInitialized(),
    proposals,
    proposalsSelection: items,
    deliberationActive,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS'),
    onSelect: (proposalId) => {
      store.dispatch({ type: '@@ui/ON_SELECT_PROPOSAL', payload: { eventId, proposalId } })
    },
    onAddProposalToSelection: (proposalId) => {
      store.dispatch({ type: '@@ui/ON_ADD_PROPOSAL_TO_SELECTION', payload: { proposalId } })
    },
  }
}

export default compose(
  forRoute.absolute('organizer-event-proposals'), //
  inject(mapStore), //
  loader, //
)(ProposalsList)
