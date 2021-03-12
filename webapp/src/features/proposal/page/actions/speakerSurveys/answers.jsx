import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'components/avatar'
import { useSpeakerSurvey } from 'data/event'
import Answer from './answer'

const Answers = ({ event, speaker }) => {
  const { id: eventId, surveyQuestions } = event
  const { id: speakerId, name, photoURL } = speaker
  const { data: answers, isLoading } = useSpeakerSurvey(eventId, speakerId)

  return (
    <div className="speaker-surveys card">
      <Avatar name={name} src={photoURL} withLabel />
      {answers ? (
        <div className="questions">
          {surveyQuestions.gender && <Answer question="gender" answer={answers.gender} />}
          {surveyQuestions.tshirt && <Answer question="tshirt" answer={answers.tshirt} />}
          {surveyQuestions.diet && <Answer question="diet" answer={answers.diet} />}
          {surveyQuestions.accomodation && (
            <Answer question="accomodation" answer={answers.accomodation} />
          )}
          {surveyQuestions.transports && (
            <Answer question="transports" answer={answers.transports} />
          )}
          {surveyQuestions.info && <Answer question="info" answer={answers.info} />}
        </div>
      ) : (
        <div className="not-answered">
          <small>{isLoading ? 'Loading...' : 'Not answered'}</small>
        </div>
      )}
    </div>
  )
}

Answers.propTypes = {
  event: PropTypes.object.isRequired,
  speaker: PropTypes.object.isRequired,
}

export default Answers
