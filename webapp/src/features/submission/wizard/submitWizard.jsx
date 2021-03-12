import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import EventTitle from 'features/event/eventTitle'
import { useEvent } from 'data/event'
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

const SubmitWizard = ({ eventId, currentStep }) => {
  const { data: event } = useEvent(eventId)
  if (!event || !event.isCfpOpened) return null
  return (
    <div className="submitWizard">
      <EventTitle name={event.name} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <Selection eventId={eventId} />}
      {currentStep === 1 && <TalkDetails eventId={eventId} />}
      {currentStep === 2 && <TalkSubmission eventId={eventId} eventName={event.name} />}
      {currentStep === 3 && <TalkSubmitted eventId={eventId} eventName={event.name} />}
    </div>
  )
}

SubmitWizard.propTypes = {
  eventId: PropTypes.string,
  currentStep: PropTypes.number,
}

SubmitWizard.defaultProps = {
  eventId: undefined,
  currentStep: 0,
}

export default SubmitWizard
