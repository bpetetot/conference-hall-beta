import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'

import LoadingIndicator from 'components/loading'
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
  loader({ print: ['loaded'], LoadingIndicator }),
)(Proposal)
