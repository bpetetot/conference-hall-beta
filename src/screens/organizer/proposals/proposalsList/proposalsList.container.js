import { compose } from 'redux'
import { inject } from 'k-ramel/react'

import loader from 'components/loader'
import ProposalsList from './proposalsList'

const mapStore = store => ({
  loaded: store.data.proposals.isInitialized(),
  proposals: store.data.proposals.getAsArray(),
  load: () => store.dispatch('LOAD_EVENT_PROPOSALS_PAGE'),
  onSelect: (eventId, proposalId) => {
    store.dispatch({ type: 'SELECT_PROPOSAL', payload: { eventId, proposalId } })
  },
})

export default compose(
  inject(mapStore), //
  loader, //
)(ProposalsList)
