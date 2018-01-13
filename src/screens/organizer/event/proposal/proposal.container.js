import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import loader from 'components/loader'
import { getRouterParam } from 'redux/router'
import proposalsData from 'redux/data/proposals'
import Proposal from './proposal'

const mapState = (state) => {
  const proposalId = getRouterParam('proposalId')(state)
  const proposal = proposalsData.get(proposalId)(state)
  return { loaded: !!proposal, proposal }
}

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'LOAD_PROPOSAL_PAGE' }),
})

export default compose(
  forRoute('PROPOSAL', { absolute: true }),
  connect(mapState, mapDispatch),
  loader,
)(Proposal)
