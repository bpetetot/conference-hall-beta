import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'screens/components/speaker'

import Answer from './answer'

import './speakerSurveys.css'

const SpeakerSurveys = ({ survey, responses }) =>
  responses.map(({ uid, response }) => (
    <div key={uid} className="speaker-surveys card">
      <Avatar id={uid} />
      {response ? (
        <div className="questions">
          {survey.gender && <Answer question="gender" answer={response.gender} />}
          {survey.tshirt && <Answer question="tshirt" answer={response.tshirt} />}
          {survey.diet && <Answer question="diet" answer={response.diet} />}
          {survey.accomodation && (
            <Answer question="accomodation" answer={response.accomodation} />
          )}
          {survey.transports && <Answer question="transports" answer={response.transports} />}
          {survey.info && <Answer question="info" answer={response.info} />}
        </div>
      ) : (
        <div className="not-answered"><small>Not answered</small></div>
      )}
    </div>
  ))

SpeakerSurveys.propTypes = {
  survey: PropTypes.objectOf(PropTypes.bool).isRequired,
  responses: PropTypes.arrayOf(PropTypes.any),
}

SpeakerSurveys.defaultProps = {
  responses: {},
}

export default SpeakerSurveys
