import { connect } from 'react-redux'

import { isCfpOpened } from 'redux/data/events'
import { getSpeakerAppEvent } from 'redux/ui/speaker'
import SubmitTalkLink from './submitTalkLink'

const mapState = (state) => {
  const { id } = getSpeakerAppEvent(state)
  const cfpOpened = isCfpOpened(id)(state)
  return { eventId: id, displayed: id && cfpOpened }
}

export default connect(mapState)(SubmitTalkLink)
