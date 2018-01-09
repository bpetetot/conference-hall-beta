import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getSpeakerAppEvent } from 'redux/ui/speaker'
import TalksSubmission from './talksSubmission'

const mapState = (state) => {
  const { name } = getSpeakerAppEvent(state)
  return { name }
}

export default compose(
  forRoute('TALKS_SUBMISSION', { absolute: true }), //
  connect(mapState), //
)(TalksSubmission)
