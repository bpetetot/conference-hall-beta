import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'

import { SubmitButton } from 'components/form'
import { useAuth } from 'features/auth'
import EventTitle from 'features/event/eventTitle'
import SurveyInput from './surveyInput'
import { useSaveSurvey, useSurvey } from '../useSurveys'
import questions from '../questions'

import './survey.css'

const SpeakerSurvey = ({ eventId, survey, name }) => {
  const { user } = useAuth()
  const { data } = useSurvey(eventId, user.uid)
  const [saveSurvey] = useSaveSurvey(eventId, user.uid)

  return (
    <div className="speaker-survey">
      <EventTitle name={name} subtitle="Speaker survey" />
      <div className="card">
        <p>
          Organizers need some information about you in order to make a better event experience for
          speakers. Please fill the following survey to help them.
        </p>
        <Form onSubmit={saveSurvey} initialValues={data}>
          {({ handleSubmit, pristine, submitting }) => (
            <form>
              {questions.map((q) => survey[q.name] && <SurveyInput key={q.name} {...q} />)}
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
  eventId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  survey: PropTypes.objectOf(PropTypes.bool),
}

SpeakerSurvey.defaultProps = {
  survey: {},
}

export default SpeakerSurvey
