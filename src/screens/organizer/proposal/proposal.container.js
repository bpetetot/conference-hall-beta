import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import loader from 'components/loader'
import Proposal from './proposal'

const mapStore = (store, props, { router }) => {
  const eventId = router.getPathParam('eventId')
  const proposalId = router.getPathParam('proposalId')
  const proposal = store.data.proposals.get(proposalId)
  return {
    loaded: !!proposal,
    proposal,
    eventId,
    load: () => {
      store.dispatch('@@ui/ON_LOAD_PROPOSAL')
      store.dispatch('@@ui/ON_LOAD_EVENT')
    },
  }
}

export default compose(
  forRoute.absolute('PROPOSAL'), //
  inject(mapStore), //
  loader, //
)(Proposal)
