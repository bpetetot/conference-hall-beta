import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import SubmissionTitle from './submissionTitle'
import Selection from './talksSelection'
import TalkSubmission from './talkSubmission'
import TalkSubmitted from './talkSubmitted'

import './submission.css'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-microphone' },
  { label: 'Talk information', icon: 'fa fa-list' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const Submission = ({ eventId, eventName, currentStep }) => {
  if (!eventId) return null
  return (
    <div className="submission">
      <SubmissionTitle eventName={eventName} />
      <Stepper steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <Selection eventId={eventId} eventName={eventName} />}
      {currentStep === 1 && <TalkSubmission eventId={eventId} eventName={eventName} />}
      {currentStep === 2 && <TalkSubmitted eventId={eventId} eventName={eventName} />}
    </div>
  )
}

Submission.propTypes = {
  eventId: PropTypes.string,
  eventName: PropTypes.string,
  currentStep: PropTypes.number,
}

Submission.defaultProps = {
  eventId: undefined,
  eventName: undefined,
  currentStep: 0,
}

export default Submission
