import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import LoadingIndicator from 'components/loader'
import { SubmitButton } from 'components/form'
import { useNotification } from 'app/layout/notification/context'
import EventTitle from 'features/event/eventTitle'
import { useSaveSurvey, useSurvey } from 'data/survey'

import questions from '../questions'
import SurveyInput from './surveyInput'
import './survey.css'

const SpeakerSurvey = ({ event }) => {
  const { sendError } = useNotification()
  const { data: userSurvey, isLoading, isError, error } = useSurvey(event.id)
  const { mutateAsync: onSaveSurvey } = useSaveSurvey(event.id)

  if (isLoading) return <LoadingIndicator />
  if (isError) return <div>An unexpected error has occurred: {error.message}</div>

  const initialValues = userSurvey?.answers || {}
  const onSubmit = (data) => {
    return onSaveSurvey(data).catch((err) => {
      sendError(`An unexpected error has occurred: ${err.message}`)
    })
  }

  return (
    <div className="speaker-survey">
      <EventTitle name={event.name} subtitle="Speaker survey" />
      <div className="card">
        <p>
          Organizers need some information about you in order to make a better event experience for
          speakers. Please fill the following survey to help them.
        </p>
        <Form onSubmit={onSubmit} initialValues={initialValues}>
          {({ handleSubmit, pristine, submitting }) => (
            <form>
              {questions.map(
                (q) => event.surveyQuestions[q.name] && <SurveyInput key={q.name} {...q} />,
              )}
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

SpeakerSurvey.propTypes = {
  event: PropTypes.object.isRequired,
}

export default SpeakerSurvey
