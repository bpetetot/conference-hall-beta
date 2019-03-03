import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import ProposalsExport from './proposalsExport'

const mapStore = (store) => {
  const proposals = store.data.proposals.getAsArray()
  return {
    loaded: store.data.proposals.isInitialized(),
    proposals,
    load: () => store.dispatch('@@ui/ON_LOAD_EVENT_PROPOSALS'),
    onSelect: (eventId, proposalId) => {
      store.dispatch({ type: '@@ui/ON_SELECT_PROPOSAL', payload: { eventId, proposalId } })
    },
  }
}

export default compose(
  forRoute.absolute('organizer-event-proposals-cards'), //
  inject(mapStore), //
  loader, //
)(ProposalsExport)
