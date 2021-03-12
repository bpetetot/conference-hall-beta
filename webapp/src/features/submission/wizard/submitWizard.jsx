import React from 'react'
import { useParams } from 'react-router'

import Stepper from 'components/stepper'
import EventTitle from 'features/event/eventTitle'
import { useEvent } from 'data/event'
import { useTalk } from 'data/talk'
import TalkDetails from './talkDetails'
import TalkSubmission from './talkSubmission'
import TalkSubmitted from './talkSubmitted'

import './submitWizard.css'
import { useWizard, WizardProvider } from './context'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const SubmitWizard = () => {
  const { talkId, eventId } = useParams()
  const { data: event } = useEvent(eventId)
  const { data: talk } = useTalk(talkId)
  const { step } = useWizard()

  if (!event || !talk || !event.isCfpOpened) return null

  return (
    <div className="submitWizard">
      <EventTitle name={event.name} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={step} />
      {step === 1 && <TalkDetails talk={talk} />}
      {step === 2 && <TalkSubmission event={event} talk={talk} />}
      {step === 3 && <TalkSubmitted event={event} talk={talk} />}
    </div>
  )
}

export default () => (
  <WizardProvider>
    <SubmitWizard />
  </WizardProvider>
)
