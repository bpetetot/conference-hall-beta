import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'
import forRoute from 'hoc-little-router'
import Proposal from './proposal'

const mapDispatch = dispatch => ({
  load: () => dispatch({ type: 'LOAD_PROPOSAL_PAGE' }),
})

export default compose(
  forRoute('PROPOSAL', { absolute: true }), //
  connect(undefined, mapDispatch), //
  loader(), //
)(Proposal)
