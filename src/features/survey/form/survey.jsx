import React from 'react'
import { Form } from 'react-final-form'

import { SubmitButton } from 'components/form'
import { LoadingIndicator } from 'components/loader'
import { useAuth } from 'features/auth'
import EventTitle from 'features/event/eventTitle'
import { useCurrentEvent } from 'features/event/currentEventContext'
import SurveyInput from './surveyInput'
import { useSaveSurvey, useSurvey } from '../useSurveys'
import questions from '../questions'

import './survey.css'

const SurveyForm = () => {
  const { user } = useAuth()
  const { data: event, isLoading: isEventLoading } = useCurrentEvent()
  const { data: userSurvey, isLoading: isSurveyLoading } = useSurvey(event.id, user.uid)
  const [saveSurvey] = useSaveSurvey(event.id, user.uid)

  if (isEventLoading || isSurveyLoading) return <LoadingIndicator />

  return (
    <div className="speaker-survey">
      <EventTitle name={event.name} subtitle="Speaker survey" />
      <div className="card">
        <p>
          Organizers need some information about you in order to make a better event experience for
          speakers. Please fill the following survey to help them.
        </p>
        <Form onSubmit={saveSurvey} initialValues={userSurvey}>
          {({ handleSubmit, pristine, submitting }) => (
            <form>
              {questions.map((q) => event.survey[q.name] && <SurveyInput key={q.name} {...q} />)}
              <SubmitButton handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
                Save Survey
              </SubmitButton>
            </form>
          )}
        </Form>
      </div>
    </div>
  )
}

export default SurveyForm
