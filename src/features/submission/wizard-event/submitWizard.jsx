import React from 'react'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import { LoadingIndicator } from 'components/loader'
import EventTitle from 'features/event/eventTitle'
import { useCurrentEvent } from 'features/event/currentEventContext'
import Selection from '../wizard/talksSelection'
import TalkDetails from '../wizard/talkDetails'
import TalkSubmission from '../wizard/talkSubmission'
import TalkSubmitted from '../wizard/talkSubmitted'

import './submitWizard.css'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const SubmitWizard = ({ currentStep }) => {
  const { data: event, isLoading } = useCurrentEvent()

  if (isLoading) return <LoadingIndicator />

  if (!event.isCfpOpened()) return null

  return (
    <div className="submitWizard">
      <EventTitle name={event.name} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <Selection />}
      {currentStep === 1 && <TalkDetails />}
      {currentStep === 2 && <TalkSubmission />}
      {currentStep === 3 && <TalkSubmitted />}
    </div>
  )
}

SubmitWizard.propTypes = {
  currentStep: PropTypes.number,
}

SubmitWizard.defaultProps = {
  currentStep: 0,
}

export default SubmitWizard
