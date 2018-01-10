import { compose } from 'redux'
import { connect } from 'react-redux'
import forRoute from 'hoc-little-router'

import { getSubmission } from 'redux/ui/speaker/submission'
import { getSpeakerAppEvent } from 'redux/ui/speaker/app'
import Submission from './submission'

const mapState = (state) => {
  const { id, name } = getSpeakerAppEvent(state) || {}
  const { currentStep } = getSubmission(state)
  return { eventId: id, eventName: name, currentStep }
}

export default compose(forRoute('SUBMISSION'), connect(mapState))(Submission)
