import { connect } from 'react-redux'
import { push } from 'redux-little-router'

import talks from 'redux/data/talks'
import TalkCard from './talkCard'

const mapState = (state, { id }) => ({
  ...talks.get(id)(state),
})

const mapDispatch = (dispatch, { id }) => ({
  goToTalk: () => dispatch(push(`/speaker/talk/${id}`)),
})

export default connect(mapState, mapDispatch)(TalkCard)
