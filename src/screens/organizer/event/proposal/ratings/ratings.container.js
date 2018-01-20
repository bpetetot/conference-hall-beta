/* eslint-disable prefer-destructuring */
import { connect } from 'react-redux'

import { getUserId } from 'redux/auth'
import ratingsData from 'redux/data/ratings'
import { hasNext, hasPrevious } from 'redux/ui/organizer/proposal'
import Ratings from './ratings'

const mapState = (state) => {
  const uid = getUserId(state)
  return {
    ...ratingsData.get(uid)(state),
    hasNext: hasNext(state),
    hasPrevious: hasPrevious(state),
  }
}

const mapDispatch = dispatch => ({
  onRating: (rating, feeling) => dispatch({ type: 'RATE_PROPOSAL', payload: { rating, feeling } }),
  onNext: () => dispatch({ type: 'NEXT_PROPOSAL' }),
  onPrevious: () => dispatch({ type: 'PREVIOUS_PROPOSAL' }),
})

export default connect(mapState, mapDispatch)(Ratings)
