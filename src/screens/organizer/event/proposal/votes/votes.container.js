/* eslint-disable prefer-destructuring */
import { connect } from 'react-redux'

import { getUserId } from 'redux/auth'
import { hasNext, hasPrevious } from 'redux/ui/organizer/proposal'
import Votes from './votes'

const mapState = (state, { proposal }) => {
  const uid = getUserId(state)
  let rating
  let feeling
  if (proposal.ratings && proposal.ratings[uid]) {
    rating = proposal.ratings[uid].rating
    feeling = proposal.ratings[uid].feeling
    if (feeling === 'love') rating += 1
  }
  return {
    rating,
    hasNext: hasNext(state),
    hasPrevious: hasPrevious(state),
  }
}

const mapDispatch = dispatch => ({
  onRate: rating => dispatch({ type: 'RATE_PROPOSAL', payload: { rating } }),
  onNext: () => dispatch({ type: 'NEXT_PROPOSAL' }),
  onPrevious: () => dispatch({ type: 'PREVIOUS_PROPOSAL' }),
})

export default connect(mapState, mapDispatch)(Votes)
