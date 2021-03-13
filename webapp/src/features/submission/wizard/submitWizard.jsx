import React from 'react'
import { useParams } from 'react-router'
import PropTypes from 'prop-types'

import Stepper from 'components/stepper'
import LoadingIndicator from 'components/loader'
import EventTitle from 'features/event/eventTitle'
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

const SubmitWizard = ({ event }) => {
  const { talkId } = useParams()
  const { data: talk, isLoading, isError, error } = useTalk(talkId)
  const { step } = useWizard()

  if (isLoading) return <LoadingIndicator />
  if (isError) return <div>An unexpected error has occurred: {error.message}</div>
  if (!event.isCfpOpened) return <div>Call for paper not opened.</div>

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

SubmitWizard.propTypes = {
  event: PropTypes.object.isRequired,
}

// eslint-disable-next-line react/prop-types
export default ({ event }) => (
  <WizardProvider>
    <SubmitWizard event={event} />
  </WizardProvider>
)
