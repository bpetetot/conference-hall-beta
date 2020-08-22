import React from 'react'
import PropTypes from 'prop-types'

import EventTitle from 'screens/components/event/eventTitle'
import SurveyForm from 'screens/components/event/survey/form'
import { useAuth } from 'features/auth'

import './survey.css'

const SpeakerSurvey = ({ name }) => {
  const { user } = useAuth()
  return (
    <div className="speaker-survey">
      <EventTitle name={name} subtitle="Speaker survey" />
      <div className="card">
        <p>
          Organizers need some information about you in order to make a better event experience for
          speakers. Please fill the following survey to help them.
        </p>
        <SurveyForm uid={user.uid} />
      </div>
    </div>
  )
}

SpeakerSurvey.propTypes = {
  name: PropTypes.string.isRequired,
}

export default SpeakerSurvey
