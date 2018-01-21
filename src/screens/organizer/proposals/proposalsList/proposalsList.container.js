import { compose } from 'redux'
import { connect } from 'react-redux'

import proposalsData from 'redux/data/proposals'
import loader from 'components/loader'
import ProposalsList from './proposalsList'

const mapState = state => ({
  loaded: proposalsData.isInitialized(state),
  proposals: proposalsData.getAsArray(state),
})

const mapDispatch = dispatch => ({
  load: () => {
    dispatch({ type: 'LOAD_EVENT_PROPOSALS_PAGE' })
  },
  onSelect: (eventId, proposalId) => {
    dispatch({ type: 'SELECT_PROPOSAL', payload: { eventId, proposalId } })
  },
})

export default compose(
  connect(mapState, mapDispatch), //
  loader, //
)(ProposalsList)
