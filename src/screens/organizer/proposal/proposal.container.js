import { compose } from 'redux'
import { inject } from 'k-ramel/react'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'store/reducers/router'
import Proposal from './proposal'

const mapStore = (store) => {
  const eventId = getRouterParam('eventId')(store.getState())
  const proposalId = getRouterParam('proposalId')(store.getState())
  const proposal = store.data.proposals.get(proposalId)
  return {
    loaded: !!proposal,
    proposal,
    eventId,
    load: () => store.dispatch({ type: 'LOAD_PROPOSAL_PAGE' }),
  }
}

export default compose(
  forRoute.absolute('PROPOSAL'), //
  inject(mapStore), //
  loader, //
)(Proposal)
