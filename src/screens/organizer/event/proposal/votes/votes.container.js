import { connect } from 'react-redux'

import { hasNext, hasPrevious } from 'redux/ui/organizer/proposal'
import Votes from './votes'

const mapState = state => ({
  hasNext: hasNext(state),
  hasPrevious: hasPrevious(state),
})

const mapDispatch = dispatch => ({
  onNext: () => dispatch({ type: 'NEXT_PROPOSAL' }),
  onPrevious: () => dispatch({ type: 'PREVIOUS_PROPOSAL' }),
})

export default connect(mapState, mapDispatch)(Votes)
