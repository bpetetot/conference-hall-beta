import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getSpeakerAppEvent } from 'redux/ui/speaker'
import TalkSubmitted from './talkSubmitted'

const mapState = (state) => {
  const { name } = getSpeakerAppEvent(state)
  return { name }
}

export default compose(
  forRoute('TALK_SUBMITTED', { absolute: true }), //
  connect(mapState), //
)(TalkSubmitted)
