import React from 'react'
import PropTypes from 'prop-types'

import { useEvent } from 'features/event/useEvents'
import UserAvatar from 'features/user/user-avatar'
import { useSurvey } from 'features/survey/useSurveys'
import Answer from './answer'

import './surveyBlock.css'

const SurveyBlock = ({ eventId, userId }) => {
  const { data: event } = useEvent(eventId)
  const { data: response, isLoading } = useSurvey(eventId, userId)
  const survey = event?.survey || {}

  return (
    <div className="survey-block card">
      <UserAvatar userId={userId} />
      {isLoading && (
        <div className="not-answered">
          <small>Loading...</small>
        </div>
      )}
      {response && (
        <div className="questions">
          {survey.gender && <Answer question="gender" answer={response.gender} />}
          {survey.tshirt && <Answer question="tshirt" answer={response.tshirt} />}
          {survey.diet && <Answer question="diet" answer={response.diet} />}
          {survey.accomodation && <Answer question="accomodation" answer={response.accomodation} />}
          {survey.transports && <Answer question="transports" answer={response.transports} />}
          {survey.info && <Answer question="info" answer={response.info} />}
        </div>
      )}
      {!response && !isLoading && (
        <div className="not-answered">
          <small>Not answered</small>
        </div>
      )}
    </div>
  )
}

SurveyBlock.propTypes = {
  eventId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
}

export default SurveyBlock
