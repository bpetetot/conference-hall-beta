import React from 'react'
import { useParams } from 'react-router'

import Stepper from 'components/stepper'
import LoadingIndicator from 'components/loader'
import { TalkTitle } from 'features/talk'
import { useTalk } from 'data/talk'
import EventsSelection from './eventsSelection'

import './submission.css'

const steps = [
  { label: 'Event selection', icon: 'fa fa-bars' },
  { label: 'Talk details', icon: 'fa fa-microphone' },
  { label: 'Event submission', icon: 'fa fa-calendar-check-o' },
  { label: 'Done !', icon: 'fa fa-paper-plane' },
]

const Submission = () => {
  const { talkId } = useParams()
  const { data: talk, isLoading, isError, error } = useTalk(talkId)

  if (isLoading) {
    return <LoadingIndicator />
  }
  if (isError) {
    return <div>An unexpected error has occurred: {error.message}</div>
  }

  return (
    <div className="submission">
      <TalkTitle name={talk.title} />
      <Stepper steps={steps} currentStep={0} />
      <EventsSelection talkId={talkId} />
    </div>
  )
}

export default Submission
