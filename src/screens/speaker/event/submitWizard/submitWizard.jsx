import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import EventTitle from 'screens/components/event/eventTitle'
import Selection from './talksSelection'
import TalkDetails from './talkDetails'
import TalkSubmission from './talkSubmission'
import TalkSubmitted from './talkSubmitted'

import './submitWizard.css'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const SubmitWizard = ({
  eventId, cfpOpened, eventName, currentStep,
}) => {
  if (!eventId || !cfpOpened) return null
  return (
    <div className="submitWizard">
      <EventTitle name={eventName} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <Selection eventId={eventId} eventName={eventName} />}
      {currentStep === 1 && <TalkDetails eventId={eventId} eventName={eventName} />}
      {currentStep === 2 && <TalkSubmission eventId={eventId} eventName={eventName} />}
      {currentStep === 3 && <TalkSubmitted eventId={eventId} eventName={eventName} />}
    </div>
  )
}

SubmitWizard.propTypes = {
  eventId: PropTypes.string,
  cfpOpened: PropTypes.bool,
  eventName: PropTypes.string,
  currentStep: PropTypes.number,
}

SubmitWizard.defaultProps = {
  eventId: undefined,
  cfpOpened: false,
  eventName: undefined,
  currentStep: 0,
}

export default SubmitWizard
