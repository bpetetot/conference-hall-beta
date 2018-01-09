import { connect } from 'react-redux'

import { isCfpOpened } from 'redux/data/events'
import { isSubmitted } from 'redux/data/talks'
import { getSpeakerAppEvent } from 'redux/ui/speaker'
import SubmitTalkButton from './submitTalkButton'

const mapState = (state, { talkId }) => {
  const { id, name } = getSpeakerAppEvent(state)
  const cfpOpened = isCfpOpened(id)(state)
  const submitted = isSubmitted(talkId, id)(state)
  return { eventName: name, displayed: id && cfpOpened, submitted }
}

export default connect(mapState)(SubmitTalkButton)
