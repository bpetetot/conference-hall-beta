/* eslint-disable prefer-destructuring */
import { connect } from 'react-redux'

import { getUserId } from 'redux/auth'
import { getUserRating } from 'redux/data/ratings'
import { hasNext, hasPrevious } from 'redux/ui/organizer/proposal'
import Ratings from './ratings'

const mapState = (state) => {
  const uid = getUserId(state)
  return {
    rating: getUserRating(uid)(state),
    hasNext: hasNext(state),
    hasPrevious: hasPrevious(state),
  }
}

const mapDispatch = dispatch => ({
  onRate: ratingValue => dispatch({ type: 'RATE_PROPOSAL', payload: { ratingValue } }),
  onNext: () => dispatch({ type: 'NEXT_PROPOSAL' }),
  onPrevious: () => dispatch({ type: 'PREVIOUS_PROPOSAL' }),
})

export default connect(mapState, mapDispatch)(Ratings)
