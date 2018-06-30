import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import ProposalsExport from './proposalsExport'

const mapStore = store => ({
  loaded: store.data.proposals.isInitialized(),
  proposals: store.data.proposals.getAsArray(),
  load: () => store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS'),
  onSelect: (eventId, proposalId) => {
    store.dispatch({ type: '@@ui/ON_SELECT_PROPOSAL', payload: { eventId, proposalId } })
  },
})

export default compose(
  forRoute.absolute('PROPOSALS_CARDS'), //
  inject(mapStore), //
  loader, //
)(ProposalsExport)
