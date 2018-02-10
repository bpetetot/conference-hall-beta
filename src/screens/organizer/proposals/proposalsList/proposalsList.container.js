import { compose } from 'redux'
import { inject } from 'k-ramel/react'

import proposalsData from 'redux/data/proposals'
import loader from 'components/loader'
import ProposalsList from './proposalsList'

const mapStore = store => ({
  loaded: proposalsData.isInitialized(store.getState()),
  proposals: proposalsData.getAsArray(store.getState()),
  load: () => {
    store.dispatch({ type: 'LOAD_EVENT_PROPOSALS_PAGE' })
  },
  onSelect: (eventId, proposalId) => {
    store.dispatch({ type: 'SELECT_PROPOSAL', payload: { eventId, proposalId } })
  },
})

export default compose(
  inject(mapStore), //
  loader, //
)(ProposalsList)
