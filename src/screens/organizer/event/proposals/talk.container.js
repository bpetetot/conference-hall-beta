import { compose } from 'redux'
import { connect } from 'react-redux'
import loader from 'hoc-react-loader/build/core'

import talksData from 'redux/data/talks'
import TalkCard from '../../../speaker/components/talkCard/talkCard'

const mapState = (state, { talkId }) => ({
  ...talksData.get(talkId)(state),
})

const mapDispatch = (dispatch, { talkId }) => ({
  load: () => dispatch({ type: 'FETCH_TALK', payload: talkId }),
})

export default compose(
  connect(mapState, mapDispatch), //
  loader(), //
)(TalkCard)
