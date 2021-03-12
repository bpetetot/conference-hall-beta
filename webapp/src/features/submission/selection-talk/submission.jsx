import React from 'react'
import { useParams } from 'react-router'

import Stepper from 'components/stepper'
import EventTitle from 'features/event/eventTitle'
import { useEvent } from 'data/event'

import TalksSelection from './talksSelection'
import './submission.css'

const steps = [
  { label: 'Talk selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const Submission = () => {
  const { eventId } = useParams()
  const { data: event } = useEvent(eventId)
  if (!event || !event.isCfpOpened) return null
  return (
    <div className="submitWizard">
      <EventTitle name={event.name} subtitle="Talk submission" />
      <Stepper steps={steps} currentStep={0} />
      <TalksSelection eventId={eventId} />
    </div>
  )
}

export default Submission
