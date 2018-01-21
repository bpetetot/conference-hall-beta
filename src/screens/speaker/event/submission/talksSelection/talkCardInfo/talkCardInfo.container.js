import { connect } from 'react-redux'

import { isSubmitted } from 'redux/data/talks'
import TalkCardInfo from './talkCardInfo'

const mapState = (state, { talkId, eventId }) => ({
  submitted: isSubmitted(talkId, eventId)(state),
})

export default connect(mapState)(TalkCardInfo)
