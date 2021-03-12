import React from 'react'
import { useParams } from 'react-router'

import { LoadingIndicator } from 'components/loader'
import EventTitle from 'features/event/eventTitle'
import { useEvent } from 'data/event'
import SurveyForm from '../form'

import './survey.css'

const SpeakerSurvey = () => {
  const { eventId } = useParams()
  const { data: event } = useEvent(eventId)

  if (!event) {
    return <LoadingIndicator />
  }

  return (
    <div className="speaker-survey">
      <EventTitle name={event.name} subtitle="Speaker survey" />
      <div className="card">
        <p>
          Organizers need some information about you in order to make a better event experience for
          speakers. Please fill the following survey to help them.
        </p>
        <SurveyForm eventId={eventId} survey={event.surveyQuestions} />
      </div>
    </div>
  )
}

export default SpeakerSurvey
