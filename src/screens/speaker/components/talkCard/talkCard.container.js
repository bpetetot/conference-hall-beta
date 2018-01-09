import { connect } from 'react-redux'

import talks from 'redux/data/talks'
import TalkCard from './talkCard'

const mapState = (state, { id }) => ({
  ...talks.get(id)(state),
})

export default connect(mapState)(TalkCard)
