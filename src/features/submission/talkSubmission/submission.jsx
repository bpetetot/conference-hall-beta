import React from 'react'

import Stepper from 'components/stepper'
import { TalkTitle } from 'features/talk'

import './submission.css'
import { useTalk } from 'features/talk/useTalks'
import { LoadingIndicator } from 'components/loader'
import EventsSelection from './eventsSelection'

const steps = [
  { label: 'Event selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const Submission = () => {
  const { data: talk, isLoading } = useTalk()

  if (isLoading) return <LoadingIndicator />

  return (
    <div className="submission">
      <TalkTitle name={talk.title} />
      <Stepper steps={steps} currentStep={0} />
      <EventsSelection talkId={talk.id} />
    </div>
  )
}

export default Submission
