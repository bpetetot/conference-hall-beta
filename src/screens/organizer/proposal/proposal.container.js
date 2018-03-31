import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import Proposal from './proposal'

const mapStore = (store, props, { router }) => {
  const eventId = router.getRouteParam('eventId')
  const proposalId = router.getRouteParam('proposalId')
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
